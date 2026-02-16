-- =============================================================================
-- Admin Account Setup for origin@aeonmi.ai
-- This migration ensures the origin@aeonmi.ai account has:
-- 1. Full admin privileges (is_admin = true)
-- 2. Lifetime subscription tier
-- 3. Active subscription status
-- 4. Super admin capabilities for managing other admins
-- =============================================================================

-- First, ensure the profiles table has the is_admin column
ALTER TABLE public.profiles 
ADD COLUMN IF NOT EXISTS is_admin BOOLEAN DEFAULT false;

-- Create an index for faster admin lookups
CREATE INDEX IF NOT EXISTS profiles_is_admin_idx 
  ON public.profiles (is_admin) 
  WHERE is_admin = true;

-- =============================================================================
-- Function to automatically set admin privileges for origin@aeonmi.ai
-- This runs whenever a new user signs up or profile is created
-- =============================================================================

CREATE OR REPLACE FUNCTION auto_grant_admin_privileges()
RETURNS TRIGGER AS $$
BEGIN
  -- Check if the email is origin@aeonmi.ai (case-insensitive)
  IF LOWER(NEW.email) = 'origin@aeonmi.ai' THEN
    -- Grant full admin privileges
    NEW.is_admin := true;
    
    -- Grant lifetime subscription
    NEW.subscription_tier := 'lifetime';
    NEW.subscription_status := 'active';
    
    -- Set payment provider to indicate this is an admin-granted account
    NEW.payment_provider := 'admin_grant';
    
    -- Add a note in the full_name if it's empty
    IF NEW.full_name IS NULL OR NEW.full_name = '' THEN
      NEW.full_name := 'Admin (Origin)';
    END IF;
  END IF;
  
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Drop the trigger if it exists and recreate it
DROP TRIGGER IF EXISTS set_admin_privileges_on_insert ON public.profiles;
CREATE TRIGGER set_admin_privileges_on_insert
  BEFORE INSERT ON public.profiles
  FOR EACH ROW
  EXECUTE FUNCTION auto_grant_admin_privileges();

-- Also apply on updates to ensure admin status is preserved
DROP TRIGGER IF EXISTS set_admin_privileges_on_update ON public.profiles;
CREATE TRIGGER set_admin_privileges_on_update
  BEFORE UPDATE ON public.profiles
  FOR EACH ROW
  EXECUTE FUNCTION auto_grant_admin_privileges();

-- =============================================================================
-- Update existing origin@aeonmi.ai profile if it exists
-- =============================================================================

UPDATE public.profiles
SET 
  is_admin = true,
  subscription_tier = 'lifetime',
  subscription_status = 'active',
  payment_provider = 'admin_grant',
  full_name = COALESCE(NULLIF(full_name, ''), 'Admin (Origin)'),
  updated_at = now()
WHERE LOWER(email) = 'origin@aeonmi.ai';

-- =============================================================================
-- Create a view for easy admin management
-- =============================================================================

CREATE OR REPLACE VIEW admin_users AS
SELECT 
  id,
  email,
  full_name,
  is_admin,
  subscription_tier,
  subscription_status,
  created_at,
  updated_at
FROM public.profiles
WHERE is_admin = true
ORDER BY created_at ASC;

-- Grant access to the view
GRANT SELECT ON admin_users TO authenticated;

-- =============================================================================
-- RLS Policies for admin management
-- =============================================================================

-- Allow admins to read all profiles
CREATE POLICY IF NOT EXISTS "admins_can_read_all_profiles"
  ON public.profiles
  FOR SELECT
  USING (
    EXISTS (
      SELECT 1 FROM public.profiles
      WHERE id = auth.uid() AND is_admin = true
    )
  );

-- Allow admins to update other users' subscription tiers
CREATE POLICY IF NOT EXISTS "admins_can_update_subscriptions"
  ON public.profiles
  FOR UPDATE
  USING (
    EXISTS (
      SELECT 1 FROM public.profiles
      WHERE id = auth.uid() AND is_admin = true
    )
  )
  WITH CHECK (
    EXISTS (
      SELECT 1 FROM public.profiles
      WHERE id = auth.uid() AND is_admin = true
    )
  );

-- =============================================================================
-- Create a function for admins to grant access to users
-- =============================================================================

CREATE OR REPLACE FUNCTION admin_grant_tier(
  target_email TEXT,
  new_tier TEXT,
  new_status TEXT DEFAULT 'active'
)
RETURNS JSON AS $$
DECLARE
  target_user_id UUID;
  admin_user_id UUID;
  result JSON;
BEGIN
  -- Get the current user ID
  admin_user_id := auth.uid();
  
  -- Check if current user is an admin
  IF NOT EXISTS (
    SELECT 1 FROM public.profiles 
    WHERE id = admin_user_id AND is_admin = true
  ) THEN
    RAISE EXCEPTION 'Unauthorized: Only admins can grant tiers';
  END IF;
  
  -- Find the target user
  SELECT id INTO target_user_id
  FROM public.profiles
  WHERE LOWER(email) = LOWER(target_email);
  
  IF target_user_id IS NULL THEN
    RAISE EXCEPTION 'User not found: %', target_email;
  END IF;
  
  -- Validate tier
  IF new_tier NOT IN ('free', 'weekly', 'lifetime') THEN
    RAISE EXCEPTION 'Invalid tier: %', new_tier;
  END IF;
  
  -- Update the user's subscription
  UPDATE public.profiles
  SET 
    subscription_tier = new_tier,
    subscription_status = new_status,
    payment_provider = 'admin_grant',
    updated_at = now()
  WHERE id = target_user_id;
  
  -- Return success result
  SELECT json_build_object(
    'success', true,
    'user_id', target_user_id,
    'email', target_email,
    'tier', new_tier,
    'status', new_status
  ) INTO result;
  
  RETURN result;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Grant execute permission to authenticated users (will check admin status inside function)
GRANT EXECUTE ON FUNCTION admin_grant_tier(TEXT, TEXT, TEXT) TO authenticated;

-- =============================================================================
-- Create a function to toggle admin status (only for super admins)
-- =============================================================================

CREATE OR REPLACE FUNCTION admin_toggle_admin_status(
  target_user_id UUID,
  should_be_admin BOOLEAN
)
RETURNS JSON AS $$
DECLARE
  current_user_id UUID;
  current_user_email TEXT;
  target_user_email TEXT;
  result JSON;
BEGIN
  -- Get the current user
  current_user_id := auth.uid();
  
  -- Get current user's email
  SELECT email INTO current_user_email
  FROM public.profiles
  WHERE id = current_user_id;
  
  -- Only origin@aeonmi.ai can manage admin status
  IF LOWER(current_user_email) != 'origin@aeonmi.ai' THEN
    RAISE EXCEPTION 'Unauthorized: Only super admins can manage admin status';
  END IF;
  
  -- Prevent self-modification
  IF current_user_id = target_user_id THEN
    RAISE EXCEPTION 'Cannot modify your own admin status';
  END IF;
  
  -- Get target user email
  SELECT email INTO target_user_email
  FROM public.profiles
  WHERE id = target_user_id;
  
  IF target_user_email IS NULL THEN
    RAISE EXCEPTION 'Target user not found';
  END IF;
  
  -- Update admin status
  UPDATE public.profiles
  SET 
    is_admin = should_be_admin,
    updated_at = now()
  WHERE id = target_user_id;
  
  -- Return success result
  SELECT json_build_object(
    'success', true,
    'user_id', target_user_id,
    'email', target_user_email,
    'is_admin', should_be_admin
  ) INTO result;
  
  RETURN result;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Grant execute permission
GRANT EXECUTE ON FUNCTION admin_toggle_admin_status(UUID, BOOLEAN) TO authenticated;

-- =============================================================================
-- Verification Query
-- Run this to verify the admin setup worked correctly
-- =============================================================================

-- This should return the origin@aeonmi.ai account with is_admin=true and tier=lifetime
DO $$
DECLARE
  admin_count INT;
BEGIN
  SELECT COUNT(*) INTO admin_count
  FROM public.profiles
  WHERE LOWER(email) = 'origin@aeonmi.ai' 
    AND is_admin = true 
    AND subscription_tier = 'lifetime';
    
  IF admin_count = 0 THEN
    RAISE WARNING 'Admin account not found or not properly configured. Please ensure origin@aeonmi.ai user has signed up.';
  ELSE
    RAISE NOTICE 'Admin account successfully configured for origin@aeonmi.ai';
  END IF;
END $$;
