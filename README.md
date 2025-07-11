# TestEcommerce

Built with Apex App Generator 🚀

## Quick Start

```bash
# Start on Android emulator
./scripts/start-android.sh

# Start with phone support (tunnel mode)
./scripts/start-android.sh -t

# Clean start (clear cache)
./scripts/clean-start.sh

# Start on iOS (macOS only)
./scripts/start-ios.sh
```

## Project Structure

```
src/
├── screens/          # App screens
├── components/       # Reusable components
├── navigation/       # Navigation setup
├── store/           # State management (Zustand)
├── services/        # API and external services
├── constants/       # Theme and configuration
├── utils/           # Helper functions
└── types/           # TypeScript types
```

## Features

✅ Multi-auth support (Email, Phone, Google, Biometric)
✅ Backend-agnostic architecture
✅ Mock services for development
✅ Navigation (Tabs, Stack, Drawer)
✅ State management with Zustand
✅ Apex green theme (customizable)
✅ 30+ reusable UI components
✅ TypeScript configured
✅ Performance optimized

## Component Examples

```tsx
import { ProductCard, SearchBar, LoadingState } from '@/components';

<ProductCard 
  title="Product Name"
  price={29.99}
  image="https://..."
  onPress={() => {}}
/>

<SearchBar 
  onSearch={(query) => console.log(query)}
  placeholder="Search products..."
/>
```

## Customization

1. **Theme**: Edit `src/constants/theme.ts`
2. **API**: Configure endpoints in `src/services/api.ts`
3. **Navigation**: Modify `src/navigation/RootNavigator.tsx`

## Generate New Component

```bash
./scripts/generate-component.sh MyNewComponent
```

## Backend Setup

This app uses mock services by default. To connect a real backend:

```bash
# Install Supabase backend
npx setup-apex-backend supabase

# Or install Firebase backend
npx setup-apex-backend firebase

# Or install custom backend
npx setup-apex-backend custom --api-url https://your-api.com
```

---

Made with ❤️ by Apex
