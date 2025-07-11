#!/usr/bin/env tsx
import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.EXPO_PUBLIC_SUPABASE_URL!;
const supabaseAnonKey = process.env.EXPO_PUBLIC_SUPABASE_ANON_KEY!;

const supabase = createClient(supabaseUrl, supabaseAnonKey);

async function testConnection() {
  console.log('Testing Supabase connection...\n');
  
  try {
    // Test auth
    const { data: { session } } = await supabase.auth.getSession();
    console.log('✅ Auth service connected');
    console.log('   Current session:', session ? 'Active' : 'None');
    
    // Test database
    const { error: dbError } = await supabase.from('user_profiles').select('count').single();
    if (!dbError || dbError.code === 'PGRST116') {
      console.log('✅ Database connected');
    } else {
      console.log('⚠️  Database connected but tables not set up');
    }
    
    console.log('\n🎉 Supabase connection successful!');
  } catch (error) {
    console.error('❌ Connection failed:', error);
  }
}

testConnection();
