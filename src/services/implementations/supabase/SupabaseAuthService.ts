import { IAuthService, User, AuthSession } from '../../interfaces/IAuthService';
import { supabase } from '../../supabase-client';
import * as WebBrowser from 'expo-web-browser';
import AsyncStorage from '@react-native-async-storage/async-storage';

export class SupabaseAuthService implements IAuthService {
  async signUp(email: string, password: string, metadata?: Record<string, any>): Promise<AuthSession> {
    const { data, error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        data: metadata,
      },
    });
    
    if (error) throw error;
    if (!data.session) throw new Error('No session returned');
    
    return this.mapSupabaseSession(data.session);
  }
  
  async signIn(email: string, password: string): Promise<AuthSession> {
    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });
    
    if (error) throw error;
    if (!data.session) throw new Error('No session returned');
    
    return this.mapSupabaseSession(data.session);
  }
  
  async signOut(): Promise<void> {
    const { error } = await supabase.auth.signOut();
    if (error) throw error;
  }
  
  async signInWithPhone(phone: string): Promise<{ sessionId: string }> {
    const { data, error } = await supabase.auth.signInWithOtp({
      phone,
    });
    
    if (error) throw error;
    
    // Return a session ID (in this case, we use the phone as identifier)
    return { sessionId: phone };
  }
  
  async verifyPhone(phone: string, code: string, sessionId: string): Promise<AuthSession> {
    const { data, error } = await supabase.auth.verifyOtp({
      phone,
      token: code,
      type: 'sms',
    });
    
    if (error) throw error;
    if (!data.session) throw new Error('No session returned');
    
    return this.mapSupabaseSession(data.session);
  }
  
  async signInWithGoogle(): Promise<AuthSession> {
    const redirectUrl = process.env.EXPO_PUBLIC_SUPABASE_URL + '/auth/v1/callback';
    
    const { data, error } = await supabase.auth.signInWithOAuth({
      provider: 'google',
      options: {
        redirectTo: redirectUrl,
      },
    });
    
    if (error) throw error;
    
    // Open web browser for OAuth
    const result = await WebBrowser.openAuthSessionAsync(
      data.url,
      redirectUrl
    );
    
    if (result.type !== 'success') {
      throw new Error('OAuth cancelled');
    }
    
    // Get session after OAuth
    const session = await this.getCurrentSession();
    if (!session) throw new Error('No session after OAuth');
    
    return session;
  }
  
  async signInWithApple(): Promise<AuthSession> {
    // Similar to Google, but with Apple provider
    throw new Error('Apple Sign In not implemented yet');
  }
  
  async enableBiometric(): Promise<void> {
    // Store current session for biometric auth
    const session = await this.getCurrentSession();
    if (!session) throw new Error('No active session');
    
    await AsyncStorage.setItem('biometric-session', JSON.stringify(session));
    await AsyncStorage.setItem('biometric-enabled', 'true');
  }
  
  async signInWithBiometric(): Promise<AuthSession> {
    const sessionStr = await AsyncStorage.getItem('biometric-session');
    if (!sessionStr) throw new Error('No biometric session saved');
    
    const savedSession = JSON.parse(sessionStr);
    
    // Refresh the session
    const { data, error } = await supabase.auth.setSession({
      access_token: savedSession.accessToken,
      refresh_token: savedSession.refreshToken,
    });
    
    if (error) throw error;
    if (!data.session) throw new Error('Failed to restore session');
    
    return this.mapSupabaseSession(data.session);
  }
  
  async isBiometricEnabled(): Promise<boolean> {
    const enabled = await AsyncStorage.getItem('biometric-enabled');
    return enabled === 'true';
  }
  
  async getCurrentSession(): Promise<AuthSession | null> {
    const { data: { session } } = await supabase.auth.getSession();
    return session ? this.mapSupabaseSession(session) : null;
  }
  
  async refreshSession(): Promise<AuthSession> {
    const { data: { session }, error } = await supabase.auth.refreshSession();
    if (error) throw error;
    if (!session) throw new Error('No session to refresh');
    
    return this.mapSupabaseSession(session);
  }
  
  async resetPassword(email: string): Promise<void> {
    const { error } = await supabase.auth.resetPasswordForEmail(email);
    if (error) throw error;
  }
  
  async updatePassword(newPassword: string): Promise<void> {
    const { error } = await supabase.auth.updateUser({
      password: newPassword,
    });
    if (error) throw error;
  }
  
  async updateUser(updates: Partial<User>): Promise<User> {
    const { data, error } = await supabase.auth.updateUser({
      data: updates,
    });
    
    if (error) throw error;
    if (!data.user) throw new Error('Update failed');
    
    return this.mapSupabaseUser(data.user);
  }
  
  async deleteUser(): Promise<void> {
    // Note: This requires service role key or user confirmation
    throw new Error('User deletion requires additional setup');
  }
  
  private mapSupabaseSession(session: any): AuthSession {
    return {
      user: this.mapSupabaseUser(session.user),
      accessToken: session.access_token,
      refreshToken: session.refresh_token,
    };
  }
  
  private mapSupabaseUser(user: any): User {
    return {
      id: user.id,
      email: user.email || '',
      name: user.user_metadata?.name || user.email?.split('@')[0] || '',
      avatar: user.user_metadata?.avatar_url,
      phone: user.phone,
    };
  }
}
