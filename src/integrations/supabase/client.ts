// This file is automatically generated. Do not edit it directly.
import { createClient } from '@supabase/supabase-js';
import type { Database } from './types';

const SUPABASE_URL = "https://zldmnncjqeexllrhnzzn.supabase.co";
const SUPABASE_PUBLISHABLE_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InpsZG1ubmNqcWVleGxscmhuenpuIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDQ1MTkyMTQsImV4cCI6MjA2MDA5NTIxNH0.QjaX3UiIjFxKmFpuvUiO8RVGSSKKZvNZqbQcswTz3DQ";

// Import the supabase client like this:
// import { supabase } from "@/integrations/supabase/client";

export const supabase = createClient<Database>(SUPABASE_URL, SUPABASE_PUBLISHABLE_KEY);