import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  Switch,
  TouchableOpacity,
  Alert,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { MainTabScreenProps } from '@/types/navigation';
import { theme } from '@/constants/theme';
import useAppStore from '@/store/useAppStore';

type Props = MainTabScreenProps<'Settings'>;

export default function SettingsScreen({ navigation }: Props) {
  const { notificationsEnabled, theme: appTheme, setNotificationsEnabled, toggleTheme } = useAppStore();
  
  // Local states for settings
  const [notifications, setNotifications] = useState(notificationsEnabled);
  const [darkMode, setDarkMode] = useState(appTheme === 'dark');
  const [biometrics, setBiometrics] = useState(false);
  const [analytics, setAnalytics] = useState(true);
  const [marketingEmails, setMarketingEmails] = useState(false);

  const handleToggle = (setting: string, value: boolean) => {
    switch (setting) {
      case 'notifications':
        setNotifications(value);
        setNotificationsEnabled(value);
        break;
      case 'darkMode':
        setDarkMode(value);
        if (value !== (appTheme === 'dark')) toggleTheme();
        if (value) {
          Alert.alert('Dark Mode', 'Dark mode wordt binnenkort toegevoegd!');
        }
        break;
      case 'biometrics':
        setBiometrics(value);
        // TODO: Implement biometrics setting
        break;
      case 'analytics':
        setAnalytics(value);
        // TODO: Implement analytics setting
        break;
      case 'marketingEmails':
        setMarketingEmails(value);
        // TODO: Implement marketing emails setting
        break;
    }
  };

  const handleClearCache = () => {
    Alert.alert(
      'Cache wissen',
      'Weet je zeker dat je de cache wilt wissen?',
      [
        { text: 'Annuleren', style: 'cancel' },
        { 
          text: 'Wissen', 
          style: 'destructive',
          onPress: () => {
            // Clear cache logic here
            Alert.alert('Succes', 'Cache is gewist!');
          },
        },
      ]
    );
  };

  const handleDeleteAccount = () => {
    Alert.alert(
      'Account verwijderen',
      'Deze actie kan niet ongedaan worden gemaakt. Al je data wordt permanent verwijderd.',
      [
        { text: 'Annuleren', style: 'cancel' },
        { 
          text: 'Verwijderen', 
          style: 'destructive',
          onPress: () => {
            Alert.alert(
              'Bevestiging',
              'Typ "VERWIJDER" om te bevestigen',
              [{ text: 'OK' }]
            );
          },
        },
      ]
    );
  };

  const SettingRow = ({
    icon,
    title,
    subtitle,
    value,
    onValueChange,
    showSwitch = true,
    onPress,
    dangerous = false,
  }: {
    icon: keyof typeof Ionicons.glyphMap;
    title: string;
    subtitle?: string;
    value?: boolean;
    onValueChange?: (value: boolean) => void;
    showSwitch?: boolean;
    onPress?: () => void;
    dangerous?: boolean;
  }) => (
    <TouchableOpacity
      style={styles.settingRow}
      onPress={onPress}
      disabled={showSwitch}
      activeOpacity={0.7}
    >
      <View style={styles.settingIcon}>
        <Ionicons
          name={icon}
          size={24}
          color={dangerous ? theme.colors.error : theme.colors.text}
        />
      </View>
      <View style={styles.settingContent}>
        <Text style={[styles.settingTitle, dangerous && styles.dangerousText]}>
          {title}
        </Text>
        {subtitle && (
          <Text style={styles.settingSubtitle}>{subtitle}</Text>
        )}
      </View>
      {showSwitch && onValueChange ? (
        <Switch
          value={value}
          onValueChange={onValueChange}
          trackColor={{
            false: theme.colors.border,
            true: theme.colors.primary,
          }}
          thumbColor={theme.colors.white}
        />
      ) : (
        <Ionicons
          name="chevron-forward"
          size={20}
          color={theme.colors.textLight}
        />
      )}
    </TouchableOpacity>
  );

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}
      >
        {/* Header */}
        <View style={styles.header}>
          <Text style={styles.title}>Instellingen</Text>
        </View>

        {/* App Settings */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>App instellingen</Text>
          <View style={styles.sectionContent}>
            <SettingRow
              icon="notifications"
              title="Push notificaties"
              subtitle="Ontvang meldingen voor belangrijke updates"
              value={notifications}
              onValueChange={(value) => handleToggle('notifications', value)}
            />
            <SettingRow
              icon="moon"
              title="Dark mode"
              subtitle="Schakel naar donker thema"
              value={darkMode}
              onValueChange={(value) => handleToggle('darkMode', value)}
            />
            <SettingRow
              icon="finger-print"
              title="Biometrische beveiliging"
              subtitle="Gebruik Face ID of Touch ID"
              value={biometrics}
              onValueChange={(value) => handleToggle('biometrics', value)}
            />
          </View>
        </View>

        {/* Privacy */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Privacy</Text>
          <View style={styles.sectionContent}>
            <SettingRow
              icon="analytics"
              title="Analytics"
              subtitle="Help ons de app te verbeteren"
              value={analytics}
              onValueChange={(value) => handleToggle('analytics', value)}
            />
            <SettingRow
              icon="mail"
              title="Marketing emails"
              subtitle="Ontvang tips en aanbiedingen"
              value={marketingEmails}
              onValueChange={(value) => handleToggle('marketingEmails', value)}
            />
            <SettingRow
              icon="document-text"
              title="Privacybeleid"
              showSwitch={false}
              onPress={() => console.log('Privacy policy')}
            />
            <SettingRow
              icon="shield-checkmark"
              title="Gebruiksvoorwaarden"
              showSwitch={false}
              onPress={() => console.log('Terms of service')}
            />
          </View>
        </View>

        {/* Storage */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Opslag</Text>
          <View style={styles.sectionContent}>
            <SettingRow
              icon="trash"
              title="Cache wissen"
              subtitle="Verwijder tijdelijke bestanden"
              showSwitch={false}
              onPress={handleClearCache}
            />
          </View>
        </View>

        {/* Danger Zone */}
        <View style={styles.section}>
          <Text style={[styles.sectionTitle, styles.dangerTitle]}>
            Gevaren zone
          </Text>
          <View style={styles.sectionContent}>
            <SettingRow
              icon="warning"
              title="Account verwijderen"
              subtitle="Verwijder je account permanent"
              showSwitch={false}
              onPress={handleDeleteAccount}
              dangerous
            />
          </View>
        </View>

        {/* App Info */}
        <View style={styles.appInfo}>
          <Text style={styles.appInfoText}>Apex App v1.0.0</Text>
          <Text style={styles.appInfoSubtext}>Made with ❤️ by Apex</Text>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.colors.background,
  },
  scrollContent: {
    paddingBottom: theme.spacing.xl * 2,
  },
  header: {
    paddingHorizontal: theme.spacing.lg,
    paddingTop: theme.spacing.md,
    paddingBottom: theme.spacing.lg,
  },
  title: {
    fontSize: 28,
    fontWeight: '700',
    color: theme.colors.text,
  },
  section: {
    marginBottom: theme.spacing.xl,
  },
  sectionTitle: {
    fontSize: 14,
    fontWeight: '600',
    color: theme.colors.textSecondary,
    textTransform: 'uppercase',
    paddingHorizontal: theme.spacing.lg,
    marginBottom: theme.spacing.sm,
  },
  dangerTitle: {
    color: theme.colors.error,
  },
  sectionContent: {
    backgroundColor: theme.colors.surface,
    borderRadius: theme.borderRadius.lg,
    marginHorizontal: theme.spacing.lg,
    overflow: 'hidden',
  },
  settingRow: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: theme.spacing.md,
    borderBottomWidth: 1,
    borderBottomColor: theme.colors.border,
  },
  settingRow__last: {
    borderBottomWidth: 0,
  },
  settingIcon: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: theme.colors.background,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: theme.spacing.md,
  },
  settingContent: {
    flex: 1,
  },
  settingTitle: {
    fontSize: 16,
    fontWeight: '500',
    color: theme.colors.text,
    marginBottom: 2,
  },
  settingSubtitle: {
    fontSize: 13,
    color: theme.colors.textSecondary,
  },
  dangerousText: {
    color: theme.colors.error,
  },
  appInfo: {
    alignItems: 'center',
    marginTop: theme.spacing.xl,
    marginBottom: theme.spacing.md,
  },
  appInfoText: {
    fontSize: 14,
    color: theme.colors.textSecondary,
    marginBottom: theme.spacing.xs,
  },
  appInfoSubtext: {
    fontSize: 12,
    color: theme.colors.textLight,
  },
});