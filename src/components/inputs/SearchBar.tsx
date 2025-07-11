import React, { useState } from 'react';
import { View, TextInput, StyleSheet, TouchableOpacity, ViewStyle } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { Colors, Spacing, BorderRadius, Typography } from '@/constants/theme';

interface SearchBarProps {
  placeholder?: string;
  value?: string;
  onChangeText?: (text: string) => void;
  onSearch?: (query: string) => void;
  onClear?: () => void;
  showFilter?: boolean;
  onFilterPress?: () => void;
  showVoiceSearch?: boolean;
  onVoicePress?: () => void;
  style?: ViewStyle;
}

export function SearchBar({
  placeholder = 'Search...',
  value: controlledValue,
  onChangeText,
  onSearch,
  onClear,
  showFilter = false,
  onFilterPress,
  style,
}: SearchBarProps) {
  const [internalValue, setInternalValue] = useState('');
  const value = controlledValue !== undefined ? controlledValue : internalValue;
  
  const handleChangeText = (text: string) => {
    if (controlledValue === undefined) {
      setInternalValue(text);
    }
    onChangeText?.(text);
  };
  
  const handleClear = () => {
    handleChangeText('');
    onClear?.();
  };
  
  const handleSubmit = () => {
    onSearch?.(value);
  };

  return (
    <View style={[styles.container, style]}>
      <Ionicons name="search" size={20} color={Colors.textSecondary} />
      
      <TextInput
        style={styles.input}
        placeholder={placeholder}
        placeholderTextColor={Colors.textSecondary}
        value={value}
        onChangeText={handleChangeText}
        onSubmitEditing={handleSubmit}
        returnKeyType="search"
      />
      
      {value.length > 0 && (
        <TouchableOpacity onPress={handleClear} style={styles.iconButton}>
          <Ionicons name="close-circle" size={20} color={Colors.textSecondary} />
        </TouchableOpacity>
      )}
      
      {showFilter && (
        <TouchableOpacity onPress={onFilterPress} style={styles.iconButton}>
          <Ionicons name="filter" size={20} color={Colors.primary} />
        </TouchableOpacity>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: Colors.surface,
    borderRadius: BorderRadius.xl,
    paddingHorizontal: Spacing.md,
    height: 48,
    gap: Spacing.sm,
  },
  input: {
    flex: 1,
    fontSize: Typography.fontSize.base,
    color: Colors.text,
  },
  iconButton: {
    padding: Spacing.xs,
  },
});