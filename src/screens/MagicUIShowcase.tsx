import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import {
  AnimatedCard,
  AnimatedText,
  FloatingActionButton, // Fixed hooks issue
  GlowingBorder,
  MeteorCard,
  ParallaxScrollView,
  ShimmerButton,
  SparkleButton,
} from '@/components/animated';
import { theme } from '@/constants/theme';

export default function MagicUIShowcase() {
  const fabActions = [
    { icon: 'camera' as const, onPress: () => console.log('Camera'), color: theme.colors.secondary },
    { icon: 'image' as const, onPress: () => console.log('Gallery'), color: theme.colors.success },
    { icon: 'location' as const, onPress: () => console.log('Location'), color: theme.colors.warning },
  ];

  return (
    <SafeAreaView style={styles.container}>
      <ParallaxScrollView
        headerHeight={250}
        headerTitle="Magic UI Components"
        headerSubtitle="Beautiful animations for your app"
        fadeHeader
      >
        <View style={styles.content}>
          {/* Animated Text Examples */}
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Animated Text</Text>
            
            <AnimatedText
              style={styles.demoText}
              animation="typewriter"
              duration={2000}
            >
              This text appears letter by letter...
            </AnimatedText>
            
            <AnimatedText
              style={[styles.demoText, styles.spacingTop]}
              animation="fade"
              delay={500}
            >
              This text fades in smoothly
            </AnimatedText>
            
            <AnimatedText
              style={[styles.demoText, styles.spacingTop]}
              animation="slide"
              delay={1000}
            >
              This text slides up with spring
            </AnimatedText>
            
            <AnimatedText
              style={[styles.demoText, styles.spacingTop]}
              animation="bounce"
              delay={1500}
            >
              This text bounces in!
            </AnimatedText>
          </View>

          {/* Button Examples */}
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Magic Buttons</Text>
            
            <ShimmerButton
              title="Shimmer Button"
              onPress={() => console.log('Shimmer pressed')}
              style={styles.button}
            />
            
            <SparkleButton
              title="Sparkle Button ✨"
              onPress={() => console.log('Sparkle pressed')}
              style={styles.button}
              sparkleCount={5}
            />
          </View>

          {/* Card Examples */}
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Animated Cards</Text>
            
            <AnimatedCard
              style={styles.card}
              onPress={() => console.log('Card pressed')}
              delay={0}
            >
              <Text style={styles.cardTitle}>Spring Animation Card</Text>
              <Text style={styles.cardText}>
                Tap me for a smooth press effect with spring physics
              </Text>
            </AnimatedCard>
            
            <GlowingBorder style={styles.card} borderWidth={3}>
              <View style={styles.glowContent}>
                <Text style={styles.cardTitle}>Glowing Border Card</Text>
                <Text style={styles.cardText}>
                  This card has an animated gradient border that glows
                </Text>
              </View>
            </GlowingBorder>
            
            <MeteorCard style={styles.card} meteorCount={3}>
              <Text style={styles.cardTitle}>Meteor Effect Card</Text>
              <Text style={styles.cardText}>
                Watch the meteors fly across this card!
              </Text>
            </MeteorCard>
          </View>

          {/* Info Section */}
          <View style={styles.infoSection}>
            <Text style={styles.infoTitle}>✨ Magic UI Components</Text>
            <Text style={styles.infoText}>
              These components are inspired by Magic UI and built with React Native Reanimated for smooth 60fps animations.
            </Text>
            <Text style={styles.infoText}>
              Use them to make your app feel more premium and engaging!
            </Text>
          </View>

          {/* Spacing for FAB */}
          <View style={{ height: 100 }} />
        </View>
      </ParallaxScrollView>

      {/* Floating Action Button */}
      <FloatingActionButton
        actions={fabActions}
        mainIcon="add"
        mainColor={theme.colors.primary}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.colors.background,
  },
  content: {
    padding: theme.spacing.lg,
  },
  section: {
    marginBottom: theme.spacing.xl * 2,
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: '700',
    color: theme.colors.text,
    marginBottom: theme.spacing.lg,
  },
  demoText: {
    fontSize: 16,
    color: theme.colors.text,
  },
  spacingTop: {
    marginTop: theme.spacing.md,
  },
  button: {
    marginBottom: theme.spacing.md,
  },
  card: {
    marginBottom: theme.spacing.lg,
  },
  cardTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: theme.colors.text,
    marginBottom: theme.spacing.sm,
  },
  cardText: {
    fontSize: 14,
    color: theme.colors.textSecondary,
    lineHeight: 20,
  },
  glowContent: {
    padding: theme.spacing.lg,
  },
  infoSection: {
    backgroundColor: theme.colors.primary + '10',
    padding: theme.spacing.lg,
    borderRadius: theme.borderRadius.lg,
    marginTop: theme.spacing.xl,
  },
  infoTitle: {
    fontSize: 20,
    fontWeight: '700',
    color: theme.colors.primary,
    marginBottom: theme.spacing.md,
  },
  infoText: {
    fontSize: 14,
    color: theme.colors.textSecondary,
    lineHeight: 20,
    marginBottom: theme.spacing.sm,
  },
});