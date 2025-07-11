import React from 'react';
import {
  TouchableOpacity,
  Text,
  StyleSheet,
  Image,
  View,
  ViewStyle,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { theme } from '@/constants/theme';

interface CategoryCardProps {
  title: string;
  image?: string;
  icon?: keyof typeof Ionicons.glyphMap;
  productCount?: number;
  onPress: () => void;
  style?: ViewStyle;
  variant?: 'default' | 'compact' | 'large';
}

export function CategoryCard({
  title,
  image,
  icon,
  productCount,
  onPress,
  style,
  variant = 'default',
}: CategoryCardProps) {
  return (
    <TouchableOpacity
      style={[styles.container, styles[variant], style]}
      onPress={onPress}
      activeOpacity={0.7}
    >
      {image ? (
        <Image source={{ uri: image }} style={[styles.image, styles[`${variant}Image`]]} />
      ) : (
        <View style={[styles.iconContainer, styles[`${variant}IconContainer`]]}>
          <Ionicons
            name={icon || 'cube-outline'}
            size={variant === 'large' ? 40 : variant === 'compact' ? 24 : 32}
            color={theme.colors.primary}
          />
        </View>
      )}
      
      <View style={styles.content}>
        <Text style={[styles.title, styles[`${variant}Title`]]} numberOfLines={1}>
          {title}
        </Text>
        {productCount !== undefined && variant !== 'compact' && (
          <Text style={styles.productCount}>
            {productCount} {productCount === 1 ? 'product' : 'producten'}
          </Text>
        )}
      </View>
      
      {variant === 'large' && (
        <Ionicons
          name="chevron-forward"
          size={20}
          color={theme.colors.textLight}
          style={styles.chevron}
        />
      )}
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: theme.colors.surface,
    borderRadius: theme.borderRadius.md,
    overflow: 'hidden',
    borderWidth: 1,
    borderColor: theme.colors.border,
  },
  default: {
    padding: theme.spacing.md,
    alignItems: 'center',
    width: 120,
  },
  compact: {
    flexDirection: 'row',
    padding: theme.spacing.sm,
    alignItems: 'center',
  },
  large: {
    flexDirection: 'row',
    padding: theme.spacing.md,
    alignItems: 'center',
  },
  image: {
    borderRadius: theme.borderRadius.sm,
  },
  defaultImage: {
    width: 80,
    height: 80,
    marginBottom: theme.spacing.sm,
  },
  compactImage: {
    width: 40,
    height: 40,
    marginRight: theme.spacing.sm,
  },
  largeImage: {
    width: 60,
    height: 60,
    marginRight: theme.spacing.md,
  },
  iconContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: theme.colors.primary + '10',
    borderRadius: theme.borderRadius.sm,
  },
  defaultIconContainer: {
    width: 80,
    height: 80,
    marginBottom: theme.spacing.sm,
  },
  compactIconContainer: {
    width: 40,
    height: 40,
    marginRight: theme.spacing.sm,
  },
  largeIconContainer: {
    width: 60,
    height: 60,
    marginRight: theme.spacing.md,
  },
  content: {
    flex: 1,
  },
  title: {
    fontWeight: '600',
    color: theme.colors.text,
  },
  defaultTitle: {
    fontSize: 14,
    textAlign: 'center',
  },
  compactTitle: {
    fontSize: 14,
  },
  largeTitle: {
    fontSize: 16,
    marginBottom: theme.spacing.xs,
  },
  productCount: {
    fontSize: 12,
    color: theme.colors.textSecondary,
    marginTop: 2,
  },
  chevron: {
    marginLeft: theme.spacing.sm,
  },
});