import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Colors, Gradients } from '../../theme/colors';
import { fontScale } from '../../theme/layout';

interface Props {
  current: number;
  total: number;
  percent: number;
  roundName: string;
}

export const ProgressBar: React.FC<Props> = ({
  current,
  total,
  percent,
  roundName,
}) => {
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.roundName} numberOfLines={1}>
          {roundName}
        </Text>
        <Text style={styles.counter}>
          {current} / {total}
        </Text>
      </View>
      <View style={styles.track}>
        <LinearGradient
          colors={Gradients.primary}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 0 }}
          style={[styles.fill, { width: `${Math.max(percent, 2)}%` }]}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginBottom: 20,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
    gap: 12,
  },
  roundName: {
    color: Colors.text,
    fontSize: fontScale(15),
    fontWeight: '700',
    flex: 1,
  },
  counter: {
    color: Colors.textMuted,
    fontSize: fontScale(14),
    fontWeight: '600',
  },
  track: {
    height: 6,
    backgroundColor: Colors.card,
    borderRadius: 3,
    overflow: 'hidden',
  },
  fill: {
    height: '100%',
    borderRadius: 3,
  },
});