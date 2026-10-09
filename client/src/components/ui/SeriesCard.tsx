import React from 'react';
import { View, Text, Image, Pressable, StyleSheet } from 'react-native';
import { Series } from '../../types';

interface Props {
  series: Series;
  onPress: (series: Series) => void;
}

export const SeriesCard: React.FC<Props> = ({ series, onPress }) => {
  return (
    <Pressable style={styles.card} onPress={() => onPress(series)}>
      <Image source={{ uri: series.poster }} style={styles.poster} />
      <Text style={styles.title} numberOfLines={2}>
        {series.title}
      </Text>
    </Pressable>
  );
};

const styles = StyleSheet.create({
  card: {
    flex: 1,
    margin: 8,
    borderRadius: 12,
    backgroundColor: '#fff',
    overflow: 'hidden',
    elevation: 4,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  poster: {
    width: '100%',
    aspectRatio: 2 / 3,
  },
  title: {
    padding: 8,
    fontSize: 14,
    fontWeight: '600',
    textAlign: 'center',
  },
});