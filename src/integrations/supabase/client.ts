// This file is automatically generated. Do not edit it directly.
import { createClient } from '@supabase/supabase-js';
import type { Database } from './types';

const SUPABASE_URL = "https://lfrcgnxazxbvuxvwrrki.supabase.co";
const SUPABASE_PUBLISHABLE_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImxmcmNnbnhhenhidnV4dndycmtpIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDQzMDkyNjAsImV4cCI6MjA1OTg4NTI2MH0.LpJ5FNEqCql0K37QZhCAQ4DmvpsS5jxFau_0VqA4MWM";

// Import the supabase client like this:
// import { supabase } from "@/integrations/supabase/client";

export const supabase = createClient<Database>(SUPABASE_URL, SUPABASE_PUBLISHABLE_KEY);