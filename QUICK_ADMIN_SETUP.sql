-- =============================================================================
-- QUICK ADMIN SETUP - Run this in Supabase SQL Editor
-- This is a simplified version for immediate setup
-- =============================================================================

-- Step 1: Add the is_admin column if it doesn't exist
ALTER TABLE public.profiles 
ADD COLUMN IF NOT EXISTS is_admin BOOLEAN DEFAULT false;

-- Step 2: Create index for faster admin lookups
CREATE INDEX IF NOT EXISTS profiles_is_admin_idx 
  ON public.profiles (is_admin) 
  WHERE is_admin = true;

-- Step 3: Update origin@aeonmi.ai account (if it exists)
UPDATE public.profiles
SET 
  is_admin = true,
  subscription_tier = 'lifetime',
  subscription_status = 'active',
  payment_provider = 'admin_grant',
  full_name = COALESCE(NULLIF(full_name, ''), 'Admin (Origin)'),
  updated_at = now()
WHERE LOWER(email) = 'origin@aeonmi.ai';

-- Step 4: Create trigger function for automatic admin privileges
CREATE OR REPLACE FUNCTION auto_grant_admin_privileges()
RETURNS TRIGGER AS $$
BEGIN
  IF LOWER(NEW.email) = 'origin@aeonmi.ai' THEN
    NEW.is_admin := true;
    NEW.subscription_tier := 'lifetime';
    NEW.subscription_status := 'active';
    NEW.payment_provider := 'admin_grant';
    IF NEW.full_name IS NULL OR NEW.full_name = '' THEN
      NEW.full_name := 'Admin (Origin)';
    END IF;
  END IF;
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Step 5: Create trigger for new signups
DROP TRIGGER IF EXISTS set_admin_privileges_on_insert ON public.profiles;
CREATE TRIGGER set_admin_privileges_on_insert
  BEFORE INSERT ON public.profiles
  FOR EACH ROW
  EXECUTE FUNCTION auto_grant_admin_privileges();

-- Step 6: Create trigger for updates
DROP TRIGGER IF EXISTS set_admin_privileges_on_update ON public.profiles;
CREATE TRIGGER set_admin_privileges_on_update
  BEFORE UPDATE ON public.profiles
  FOR EACH ROW
  EXECUTE FUNCTION auto_grant_admin_privileges();

-- Step 7: Add RLS policies for admins
CREATE POLICY IF NOT EXISTS "admins_can_read_all_profiles"
  ON public.profiles
  FOR SELECT
  USING (
    EXISTS (
      SELECT 1 FROM public.profiles
      WHERE id = auth.uid() AND is_admin = true
    )
  );

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

-- Step 8: Verify the setup
SELECT 
  email,
  full_name,
  is_admin,
  subscription_tier,
  subscription_status,
  created_at
FROM public.profiles
WHERE LOWER(email) = 'origin@aeonmi.ai';

-- If you see a row with is_admin=true and subscription_tier=lifetime, you're all set! ✅
