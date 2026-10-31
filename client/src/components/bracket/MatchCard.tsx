import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Match, Series } from '../../types';
import { SeriesCard } from '../ui/SeriesCard';
import { Colors } from '../../theme/colors';
import { CARD_GAP, fontScale } from '../../theme/layout';

interface Props {
  match: Match;
  onSelect: (series: Series) => void;
}

export const MatchCard: React.FC<Props> = ({ match, onSelect }) => {
  return (
    <View style={styles.container}>
      <SeriesCard series={match.seriesA} onPress={onSelect} />
      <SeriesCard series={match.seriesB} onPress={onSelect} />

      <View style={styles.vsWrapper} pointerEvents="none">
        <View style={styles.vsBadge}>
          <Text style={styles.vsText}>VS</Text>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    gap: CARD_GAP,
    position: 'relative',
  },
  vsWrapper: {
    position: 'absolute',
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,
    alignItems: 'center',
    justifyContent: 'center',
  },
  vsBadge: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: Colors.accent,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 3,
    borderColor: Colors.bg,
  },
  vsText: {
    color: Colors.text,
    fontSize: fontScale(11),
    fontWeight: '900',
  },
});