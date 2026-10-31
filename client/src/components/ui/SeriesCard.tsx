import React from 'react';
import { View, Text, Image, Pressable, StyleSheet } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import * as Haptics from 'expo-haptics';
import { Series } from '../../types';
import { Colors } from '../../theme/colors';
import { CARD_WIDTH, CARD_HEIGHT, fontScale } from '../../theme/layout';

interface Props {
  series: Series;
  onPress: (series: Series) => void;
  disabled?: boolean;
}

export const SeriesCard: React.FC<Props> = ({ series, onPress, disabled }) => {
  const handlePress = () => {
    if (disabled) return;
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);
    onPress(series);
  };

  return (
    <Pressable
      style={({ pressed }) => [
        styles.card,
        pressed && !disabled && styles.cardPressed,
      ]}
      onPress={handlePress}
      disabled={disabled}
    >
      <Image
        source={{ uri: series.poster }}
        style={styles.poster}
        resizeMode="cover"
      />
      <LinearGradient
        colors={['transparent', 'rgba(11,15,25,0.95)']}
        style={styles.gradient}
      />
      {series.rating !== undefined && (
        <View style={styles.ratingBadge}>
          <Text style={styles.ratingText} numberOfLines={1}>
            {series.rating}
          </Text>
        </View>
      )}
      <View style={styles.info}>
        <Text style={styles.title} numberOfLines={2}>
          {series.title}
        </Text>
        {series.genre && (
          <Text style={styles.genre} numberOfLines={1}>
            {series.genre}
          </Text>
        )}
      </View>
    </Pressable>
  );
};

const styles = StyleSheet.create({
  card: {
    width: CARD_WIDTH,
    height: CARD_HEIGHT,
    borderRadius: 16,
    overflow: 'hidden',
    backgroundColor: Colors.card,
    borderWidth: 1,
    borderColor: Colors.border,
  },
  cardPressed: {
    transform: [{ scale: 0.97 }],
    borderColor: Colors.accent,
  },
  poster: {
    width: '100%',
    height: '100%',
  },
  gradient: {
    position: 'absolute',
    left: 0,
    right: 0,
    bottom: 0,
    height: '55%',
  },
  ratingBadge: {
    position: 'absolute',
    top: 8,
    right: 8,
    backgroundColor: 'rgba(11,15,25,0.85)',
    paddingHorizontal: 8,
    paddingVertical: 3,
    borderRadius: 10,
    minWidth: 36,
    alignItems: 'center',
  },
  ratingText: {
    color: Colors.gold,
    fontSize: fontScale(12),
    fontWeight: '700',
  },
  info: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    padding: 10,
  },
  title: {
    color: Colors.text,
    fontSize: fontScale(13),
    fontWeight: '700',
    lineHeight: fontScale(16),
    marginBottom: 2,
  },
  genre: {
    color: Colors.textMuted,
    fontSize: fontScale(11),
    fontWeight: '500',
  },
});