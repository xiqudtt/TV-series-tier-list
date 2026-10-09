import React from 'react';
import { View, StyleSheet } from 'react-native';
import { Match, Series } from '../../types';
import { SeriesCard } from '../ui/SeriesCard';

interface Props {
  match: Match;
  onSelect: (series: Series) => void;
}

export const MatchCard: React.FC<Props> = ({ match, onSelect }) => {
  return (
    <View style={styles.row}>
      <SeriesCard series={match.seriesA} onPress={onSelect} />
      <SeriesCard series={match.seriesB} onPress={onSelect} />
    </View>
  );
};

const styles = StyleSheet.create({
  row: {
    flexDirection: 'row',
    height: 300,
  },
});