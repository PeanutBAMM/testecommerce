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

interface ProductCardProps {
  title: string;
  price: number;
  originalPrice?: number;
  image: string;
  rating?: number;
  reviews?: number;
  discount?: number;
  isNew?: boolean;
  isFavorite?: boolean;
  onPress: () => void;
  onFavoritePress?: () => void;
  style?: ViewStyle;
  compact?: boolean;
}

export function ProductCard({
  title,
  price,
  originalPrice,
  image,
  rating,
  reviews,
  discount,
  isNew,
  isFavorite,
  onPress,
  onFavoritePress,
  style,
  compact = false,
}: ProductCardProps) {
  const formatPrice = (value: number) => {
    return new Intl.NumberFormat('nl-NL', {
      style: 'currency',
      currency: 'EUR',
    }).format(value);
  };

  return (
    <TouchableOpacity
      style={[styles.container, compact && styles.containerCompact, style]}
      onPress={onPress}
      activeOpacity={0.7}
    >
      <View style={styles.imageContainer}>
        <Image
          source={{ uri: image }}
          style={[styles.image, compact && styles.imageCompact]}
          resizeMode="cover"
        />
        
        {/* Badges */}
        {(discount || isNew) && (
          <View style={styles.badgeContainer}>
            {discount && (
              <View style={[styles.badge, styles.discountBadge]}>
                <Text style={styles.badgeText}>-{discount}%</Text>
              </View>
            )}
            {isNew && (
              <View style={[styles.badge, styles.newBadge]}>
                <Text style={styles.badgeText}>NIEUW</Text>
              </View>
            )}
          </View>
        )}
        
        {/* Favorite Button */}
        <TouchableOpacity
          style={styles.favoriteButton}
          onPress={onFavoritePress}
          hitSlop={{ top: 10, right: 10, bottom: 10, left: 10 }}
        >
          <Ionicons
            name={isFavorite ? 'heart' : 'heart-outline'}
            size={20}
            color={isFavorite ? theme.colors.error : theme.colors.text}
          />
        </TouchableOpacity>
      </View>
      
      <View style={styles.content}>
        {/* Rating */}
        {rating && (
          <View style={styles.ratingContainer}>
            <Ionicons name="star" size={14} color={theme.colors.warning} />
            <Text style={styles.rating}>{rating.toFixed(1)}</Text>
            {reviews && (
              <Text style={styles.reviews}>({reviews})</Text>
            )}
          </View>
        )}
        
        {/* Title */}
        <Text style={[styles.title, compact && styles.titleCompact]} numberOfLines={2}>
          {title}
        </Text>
        
        {/* Price */}
        <View style={styles.priceContainer}>
          <Text style={[styles.price, compact && styles.priceCompact]}>
            {formatPrice(price)}
          </Text>
          {originalPrice && (
            <Text style={styles.originalPrice}>
              {formatPrice(originalPrice)}
            </Text>
          )}
        </View>
        
        {/* Quick Add Button */}
        {!compact && (
          <TouchableOpacity style={styles.addButton}>
            <Ionicons name="add" size={20} color={theme.colors.white} />
            <Text style={styles.addButtonText}>Toevoegen</Text>
          </TouchableOpacity>
        )}
      </View>
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
  containerCompact: {
    flexDirection: 'row',
  },
  imageContainer: {
    position: 'relative',
  },
  image: {
    width: '100%',
    height: 180,
    backgroundColor: theme.colors.background,
  },
  imageCompact: {
    width: 100,
    height: 100,
  },
  badgeContainer: {
    position: 'absolute',
    top: theme.spacing.sm,
    left: theme.spacing.sm,
    flexDirection: 'column',
    gap: theme.spacing.xs,
  },
  badge: {
    paddingHorizontal: theme.spacing.sm,
    paddingVertical: theme.spacing.xs,
    borderRadius: theme.borderRadius.sm,
  },
  discountBadge: {
    backgroundColor: theme.colors.error,
  },
  newBadge: {
    backgroundColor: theme.colors.success,
  },
  badgeText: {
    color: theme.colors.white,
    fontSize: 10,
    fontWeight: '700',
  },
  favoriteButton: {
    position: 'absolute',
    top: theme.spacing.sm,
    right: theme.spacing.sm,
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: theme.colors.white + 'E6',
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  content: {
    padding: theme.spacing.md,
    flex: 1,
  },
  ratingContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: theme.spacing.xs,
    gap: 4,
  },
  rating: {
    fontSize: 12,
    fontWeight: '600',
    color: theme.colors.text,
  },
  reviews: {
    fontSize: 12,
    color: theme.colors.textSecondary,
  },
  title: {
    fontSize: 14,
    fontWeight: '500',
    color: theme.colors.text,
    marginBottom: theme.spacing.sm,
    lineHeight: 20,
  },
  titleCompact: {
    fontSize: 13,
    marginBottom: theme.spacing.xs,
  },
  priceContainer: {
    flexDirection: 'row',
    alignItems: 'baseline',
    gap: theme.spacing.xs,
  },
  price: {
    fontSize: 18,
    fontWeight: '700',
    color: theme.colors.text,
  },
  priceCompact: {
    fontSize: 16,
  },
  originalPrice: {
    fontSize: 14,
    color: theme.colors.textSecondary,
    textDecorationLine: 'line-through',
  },
  addButton: {
    flexDirection: 'row',
    backgroundColor: theme.colors.primary,
    borderRadius: theme.borderRadius.sm,
    paddingVertical: theme.spacing.sm,
    paddingHorizontal: theme.spacing.md,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: theme.spacing.sm,
    gap: theme.spacing.xs,
  },
  addButtonText: {
    color: theme.colors.white,
    fontSize: 14,
    fontWeight: '600',
  },
});