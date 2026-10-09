import { View, Text, StyleSheet } from 'react-native';
import { useLocalSearchParams } from 'expo-router';
import { useBracket } from '../hooks/useBracket';
import { SeriesCard } from '../components/ui/SeriesCard';

export default function BracketScreen() {
  const { size } = useLocalSearchParams<{ size: string }>();
	const bracketSize = size === '128' ? 128 : 64;

  const { currentMatch, champion, selectWinner, progress } = useBracket(bracketSize);

  if (champion) {
    return (
      <View style={styles.container}>
        <Text style={styles.title}>Чемпион</Text>
        <SeriesCard series={champion} onPress={() => {}} />
      </View>
    );
  }

  if (!currentMatch) {
    return (
      <View style={styles.container}>
        <Text>Загрузка...</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Text style={styles.progress}>Матч {progress}</Text>
      <View style={styles.cardsRow}>
        <SeriesCard series={currentMatch.seriesA} onPress={selectWinner} />
        <SeriesCard series={currentMatch.seriesB} onPress={selectWinner} />
      </View>
      <Text style={styles.hint}>Нажми на сериал, который проходит дальше</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 16, justifyContent: 'center' },
  title: { fontSize: 28, fontWeight: 'bold', textAlign: 'center', marginBottom: 24 },
  progress: { textAlign: 'center', fontSize: 16, marginBottom: 16, color: '#666' },
  cardsRow: { flexDirection: 'row', height: 300 },
  hint: { textAlign: 'center', marginTop: 24, color: '#999' },
});