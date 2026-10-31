import React from 'react';
import { Pressable, Text, StyleSheet, ViewStyle } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import * as Haptics from 'expo-haptics';
import { Colors, Gradients } from '../../theme/colors';
import { fontScale } from '../../theme/layout';

interface Props {
  title: string;
  onPress: () => void;
  variant?: 'primary' | 'outline' | 'danger';
  style?: ViewStyle;
  symbol?: string;
  disabled?: boolean;
}

export const Button: React.FC<Props> = ({
  title,
  onPress,
  variant = 'primary',
  style,
  symbol,
  disabled,
}) => {
  const handlePress = () => {
    if (disabled) return;
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
    onPress();
  };

  if (variant === 'outline') {
    return (
      <Pressable
        onPress={handlePress}
        disabled={disabled}
        style={({ pressed }) => [
          styles.outline,
          pressed && !disabled && { opacity: 0.7 },
          disabled && { opacity: 0.4 },
          style,
        ]}
      >
        <Text style={styles.outlineText} numberOfLines={1}>
          {symbol ? `${symbol} ` : ''}
          {title}
        </Text>
      </Pressable>
    );
  }

  const gradient =
    variant === 'danger'
      ? (['#FF5C7A', '#FF9F1C'] as const)
      : Gradients.primary;

  return (
    <Pressable
      onPress={handlePress}
      disabled={disabled}
      style={({ pressed }) => [
        styles.wrapper,
        pressed && !disabled && { transform: [{ scale: 0.97 }] },
        disabled && { opacity: 0.5 },
        style,
      ]}
    >
      <LinearGradient
        colors={[...gradient]}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
        style={styles.gradient}
      >
        <Text style={styles.text} numberOfLines={1}>
          {symbol ? `${symbol} ` : ''}
          {title}
        </Text>
      </LinearGradient>
    </Pressable>
  );
};

const styles = StyleSheet.create({
  wrapper: {
    borderRadius: 14,
    overflow: 'hidden',
    flex: 1,
  },
  gradient: {
    paddingVertical: 14,
    paddingHorizontal: 20,
    alignItems: 'center',
    justifyContent: 'center',
    minHeight: 48,
  },
  text: {
    color: Colors.text,
    fontSize: fontScale(15),
    fontWeight: '700',
  },
  outline: {
    flex: 1,
    paddingVertical: 14,
    paddingHorizontal: 20,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    borderColor: Colors.border,
    borderRadius: 14,
    minHeight: 48,
  },
  outlineText: {
    color: Colors.text,
    fontSize: fontScale(15),
    fontWeight: '600',
  },
});