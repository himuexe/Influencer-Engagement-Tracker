// This file is automatically generated. Do not edit it directly.
import { createClient } from '@supabase/supabase-js';
import type { Database } from './types';

const SUPABASE_URL = "https://cotrrvgcscjgominoogj.supabase.co";
const SUPABASE_PUBLISHABLE_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImNvdHJydmdjc2NqZ29taW5vb2dqIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDQ1NjQ1MzEsImV4cCI6MjA2MDE0MDUzMX0.uKWpGUpptbUletwoWLB7xRDwPz8xz672bVbtM0it8Gc";

// Import the supabase client like this:
// import { supabase } from "@/integrations/supabase/client";

export const supabase = createClient<Database>(SUPABASE_URL, SUPABASE_PUBLISHABLE_KEY);