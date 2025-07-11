#!/usr/bin/env tsx
/* eslint-disable no-console */
import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.EXPO_PUBLIC_SUPABASE_URL!;
const supabaseAnonKey = process.env.EXPO_PUBLIC_SUPABASE_ANON_KEY!;

const supabase = createClient(supabaseUrl, supabaseAnonKey);

async function setupDatabase() {
  console.log('Setting up Supabase database...\n');
  
  // Note: Most table creation requires service role key
  // For now, we'll just verify connection
  
  const { data, error } = await supabase.auth.getSession();
  if (error) {
    console.error('Connection test failed:', error);
  } else {
    console.log('✅ Successfully connected to Supabase!');
    console.log('\nNext steps:');
    console.log('1. Go to your Supabase dashboard');
    console.log('2. Run the SQL queries in scripts/supabase-schema.sql');
    console.log('3. Configure auth providers');
    console.log('4. Set up storage buckets');
  }
}

setupDatabase();
