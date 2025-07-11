import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  FlatList,
  Dimensions,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { MainTabScreenProps } from '@/types/navigation';
import { theme } from '@/constants/theme';
import { SearchBar } from '@/components/inputs/SearchBar';
import { ProductCard } from '@/components/cards/ProductCard';
import { CategoryCard } from '@/components/cards/CategoryCard';

type Props = MainTabScreenProps<'Home'>;

const { width: SCREEN_WIDTH } = Dimensions.get('window');

export default function HomeScreen({ navigation }: Props) {
  const [selectedCategory, setSelectedCategory] = useState('all');

  const categories = [
    { id: 'all', name: 'Alles', icon: 'apps' },
    { id: 'electronics', name: 'Elektronica', icon: 'phone-portrait' },
    { id: 'clothing', name: 'Kleding', icon: 'shirt' },
    { id: 'home', name: 'Wonen', icon: 'home' },
    { id: 'sports', name: 'Sport', icon: 'football' },
    { id: 'books', name: 'Boeken', icon: 'book' },
  ];

  const featuredProducts = [
    {
      id: '1',
      title: 'Wireless Headphones',
      price: 79.99,
      originalPrice: 99.99,
      image: 'https://via.placeholder.com/200',
      rating: 4.5,
      reviews: 234,
      discount: 20,
    },
    {
      id: '2',
      title: 'Smart Watch Pro',
      price: 249.99,
      image: 'https://via.placeholder.com/200',
      rating: 4.8,
      reviews: 567,
      isNew: true,
    },
  ];

  const handleSearch = (query: string) => {
    console.log('Searching for:', query);
  };

  const handleProductPress = (productId: string) => {
    console.log('Product pressed:', productId);
  };

  const handleCartPress = () => {
    console.log('Cart pressed');
  };

  const renderCategory = ({ item }: { item: typeof categories[0] }) => (
    <TouchableOpacity
      style={[
        styles.categoryItem,
        selectedCategory === item.id && styles.categoryItemActive,
      ]}
      onPress={() => setSelectedCategory(item.id)}
    >
      <Ionicons
        name={item.icon as any}
        size={24}
        color={selectedCategory === item.id ? theme.colors.primary : theme.colors.textSecondary}
      />
      <Text
        style={[
          styles.categoryText,
          selectedCategory === item.id && styles.categoryTextActive,
        ]}
      >
        {item.name}
      </Text>
    </TouchableOpacity>
  );

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView
        showsVerticalScrollIndicator={false}
        stickyHeaderIndices={[1]}
      >
        {/* Header */}
        <View style={styles.header}>
          <View>
            <Text style={styles.greeting}>Goedemorgen! 👋</Text>
            <Text style={styles.subGreeting}>Waar ben je naar op zoek?</Text>
          </View>
          <View style={styles.headerActions}>
            <TouchableOpacity style={styles.headerButton}>
              <Ionicons name="notifications-outline" size={24} color={theme.colors.text} />
              <View style={styles.notificationBadge}>
                <Text style={styles.notificationBadgeText}>3</Text>
              </View>
            </TouchableOpacity>
            <TouchableOpacity style={styles.headerButton} onPress={handleCartPress}>
              <Ionicons name="cart-outline" size={24} color={theme.colors.text} />
              <View style={styles.cartBadge}>
                <Text style={styles.cartBadgeText}>2</Text>
              </View>
            </TouchableOpacity>
          </View>
        </View>

        {/* Search Bar - Sticky */}
        <View style={styles.searchContainer}>
          <SearchBar
            placeholder="Zoek producten, merken..."
            onSearch={handleSearch}
            showVoiceSearch
            showFilter
          />
        </View>

        {/* Banner */}
        <View style={styles.banner}>
          <View style={styles.bannerContent}>
            <Text style={styles.bannerTitle}>Summer Sale</Text>
            <Text style={styles.bannerSubtitle}>Tot 50% korting</Text>
            <TouchableOpacity style={styles.bannerButton}>
              <Text style={styles.bannerButtonText}>Shop nu</Text>
            </TouchableOpacity>
          </View>
        </View>

        {/* Categories */}
        <View style={styles.categoriesSection}>
          <Text style={styles.sectionTitle}>Categorieën</Text>
          <FlatList
            data={categories}
            renderItem={renderCategory}
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={styles.categoriesList}
            keyExtractor={(item) => item.id}
          />
        </View>

        {/* Flash Deals */}
        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>⚡ Flash Deals</Text>
            <TouchableOpacity>
              <Text style={styles.seeAllText}>Bekijk alles</Text>
            </TouchableOpacity>
          </View>
          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={styles.productsScroll}
          >
            {featuredProducts.map((product) => (
              <ProductCard
                key={product.id}
                {...product}
                onPress={() => handleProductPress(product.id)}
                style={styles.productCard}
              />
            ))}
          </ScrollView>
        </View>

        {/* Popular Products */}
        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>🔥 Populair</Text>
            <TouchableOpacity>
              <Text style={styles.seeAllText}>Bekijk alles</Text>
            </TouchableOpacity>
          </View>
          <View style={styles.productGrid}>
            {featuredProducts.map((product) => (
              <ProductCard
                key={`popular-${product.id}`}
                {...product}
                onPress={() => handleProductPress(product.id)}
                style={styles.gridProductCard}
                compact
              />
            ))}
          </View>
        </View>

        {/* Recently Viewed */}
        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>Recent bekeken</Text>
            <TouchableOpacity>
              <Text style={styles.seeAllText}>Wis geschiedenis</Text>
            </TouchableOpacity>
          </View>
          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={styles.productsScroll}
          >
            {featuredProducts.slice(0, 1).map((product) => (
              <ProductCard
                key={`recent-${product.id}`}
                {...product}
                onPress={() => handleProductPress(product.id)}
                style={styles.productCard}
              />
            ))}
          </ScrollView>
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
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: theme.spacing.lg,
    paddingTop: theme.spacing.md,
    paddingBottom: theme.spacing.sm,
  },
  greeting: {
    fontSize: 24,
    fontWeight: '700',
    color: theme.colors.text,
  },
  subGreeting: {
    fontSize: 14,
    color: theme.colors.textSecondary,
    marginTop: 2,
  },
  headerActions: {
    flexDirection: 'row',
    gap: theme.spacing.sm,
  },
  headerButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: theme.colors.surface,
    justifyContent: 'center',
    alignItems: 'center',
    position: 'relative',
  },
  notificationBadge: {
    position: 'absolute',
    top: -4,
    right: -4,
    backgroundColor: theme.colors.error,
    borderRadius: 10,
    minWidth: 20,
    height: 20,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 4,
  },
  notificationBadgeText: {
    color: theme.colors.white,
    fontSize: 12,
    fontWeight: '600',
  },
  cartBadge: {
    position: 'absolute',
    top: -4,
    right: -4,
    backgroundColor: theme.colors.primary,
    borderRadius: 10,
    minWidth: 20,
    height: 20,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 4,
  },
  cartBadgeText: {
    color: theme.colors.white,
    fontSize: 12,
    fontWeight: '600',
  },
  searchContainer: {
    paddingHorizontal: theme.spacing.lg,
    paddingVertical: theme.spacing.sm,
    backgroundColor: theme.colors.background,
  },
  banner: {
    height: 180,
    marginHorizontal: theme.spacing.lg,
    marginVertical: theme.spacing.md,
    borderRadius: theme.borderRadius.lg,
    backgroundColor: theme.colors.primary,
    overflow: 'hidden',
    padding: theme.spacing.lg,
    justifyContent: 'center',
  },
  bannerContent: {
    flex: 1,
    justifyContent: 'center',
  },
  bannerTitle: {
    fontSize: 28,
    fontWeight: '700',
    color: theme.colors.white,
    marginBottom: theme.spacing.xs,
  },
  bannerSubtitle: {
    fontSize: 16,
    color: theme.colors.white,
    opacity: 0.9,
    marginBottom: theme.spacing.md,
  },
  bannerButton: {
    backgroundColor: theme.colors.white,
    paddingHorizontal: theme.spacing.lg,
    paddingVertical: theme.spacing.sm,
    borderRadius: theme.borderRadius.full,
    alignSelf: 'flex-start',
  },
  bannerButtonText: {
    color: theme.colors.primary,
    fontWeight: '600',
  },
  categoriesSection: {
    marginBottom: theme.spacing.lg,
  },
  categoriesList: {
    paddingHorizontal: theme.spacing.lg,
  },
  categoryItem: {
    alignItems: 'center',
    marginRight: theme.spacing.lg,
    paddingVertical: theme.spacing.sm,
  },
  categoryItemActive: {
    borderBottomWidth: 2,
    borderBottomColor: theme.colors.primary,
  },
  categoryText: {
    fontSize: 12,
    color: theme.colors.textSecondary,
    marginTop: theme.spacing.xs,
  },
  categoryTextActive: {
    color: theme.colors.primary,
    fontWeight: '600',
  },
  section: {
    marginBottom: theme.spacing.xl,
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: theme.spacing.lg,
    marginBottom: theme.spacing.md,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: theme.colors.text,
  },
  seeAllText: {
    fontSize: 14,
    color: theme.colors.primary,
    fontWeight: '600',
  },
  productsScroll: {
    paddingHorizontal: theme.spacing.lg,
  },
  productCard: {
    marginRight: theme.spacing.md,
    width: 160,
  },
  productGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    paddingHorizontal: theme.spacing.lg,
    gap: theme.spacing.md,
  },
  gridProductCard: {
    width: (SCREEN_WIDTH - theme.spacing.lg * 2 - theme.spacing.md) / 2,
  },
});