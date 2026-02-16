-- Add subscription fields to profiles table for unified payment system
-- This allows browser and mobile to share subscription state via Supabase

CREATE TABLE IF NOT EXISTS public.profiles (
  id uuid primary key references auth.users on delete cascade,
  email text,
  full_name text,
  avatar_url text,
  subscription_tier text default 'free', -- 'free', 'weekly', 'lifetime'
  subscription_status text default null, -- 'active', 'cancelled', 'trial', etc.
  trial_started_at timestamptz,
  stripe_customer_id text unique,
  revenuecat_customer_id text,
  payment_provider text, -- 'stripe' or 'revenuecat'
  created_at timestamptz default now(),
  updated_at timestamptz default now()
);

-- Create index for faster lookups
CREATE INDEX IF NOT EXISTS profiles_subscription_tier_idx 
  ON public.profiles (subscription_tier);
CREATE INDEX IF NOT EXISTS profiles_stripe_customer_idx 
  ON public.profiles (stripe_customer_id);
CREATE INDEX IF NOT EXISTS profiles_updated_idx 
  ON public.profiles (updated_at DESC);

-- Enable RLS
ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;

-- Policy: Users can read their own profile + public tier info
CREATE POLICY IF NOT EXISTS "profiles_select_own"
  ON public.profiles
  FOR SELECT
  USING (auth.uid() = id);

-- Policy: Users can update their own profile
CREATE POLICY IF NOT EXISTS "profiles_update_own"
  ON public.profiles
  FOR UPDATE
  USING (auth.uid() = id)
  WITH CHECK (auth.uid() = id);

-- Policy: Webhooks can update profiles (requires proper JWT setup)
CREATE POLICY IF NOT EXISTS "profiles_webhook_update"
  ON public.profiles
  FOR UPDATE
  USING (auth.role() = 'service_role');

-- Trigger to auto-update 'updated_at' timestamp
CREATE OR REPLACE FUNCTION update_profiles_updated_at()
RETURNS trigger AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

DROP TRIGGER IF EXISTS profiles_updated_at_trigger ON public.profiles;
CREATE TRIGGER profiles_updated_at_trigger
  BEFORE UPDATE ON public.profiles
  FOR EACH ROW
  EXECUTE FUNCTION update_profiles_updated_at();
