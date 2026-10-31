import { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  Image,
  ActivityIndicator,
} from 'react-native';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { LinearGradient } from 'expo-linear-gradient';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useSeriesData } from '../hooks/useSeriesData';
import { useBracket } from '../hooks/useBracket';
import { MatchCard } from '../components/bracket/MatchCard';
import { ProgressBar } from '../components/ui/ProgressBar';
import { Button } from '../components/ui/Button';
import { Colors } from '../theme/colors';
import {
  CHAMPION_HEIGHT,
  CHAMPION_WIDTH,
  fontScale,
  getContainerStyle,
  Spacing,
} from '../theme/layout';
import { fetchSeriesBatch } from '../services/tmbd';
import { shuffleArray } from '../utils/bracketUtils';
import { Series } from '../types';

export default function BracketScreen() {
  const { size } = useLocalSearchParams<{ size: string }>();
  const router = useRouter();
  const bracketSize = size === '128' ? 128 : 64;

  const { series, loading, error } = useSeriesData(bracketSize);

  if (loading) {
    return (
      <View style={styles.center}>
        <ActivityIndicator color={Colors.accent} size="large" />
        <Text style={styles.muted}>Загружаем сериалы...</Text>
      </View>
    );
  }

  if (error) {
    return (
      <View style={styles.center}>
        <Text style={styles.errorText}>{error}</Text>
        <Button
          title="Повторить"
          variant="outline"
          onPress={() => router.replace(`/bracket?size=${bracketSize}`)}
          style={{ flex: 0, minWidth: 160 }}
        />
      </View>
    );
  }

  if (series.length < 2) {
    return (
      <View style={styles.center}>
        <Text style={styles.errorText}>Недостаточно данных</Text>
      </View>
    );
  }

  return (
    <BracketGame
      series={series}
      bracketSize={bracketSize}
      onExit={() => router.back()}
    />
  );
}

function BracketGame({
  series,
  bracketSize,
  onExit,
}: {
  series: Series[];
  bracketSize: 64 | 128;
  onExit: () => void;
}) {
  const {
    currentMatch,
    champion,
    selectWinner,
    goBack,
    restart,
    canGoBack,
    progress,
  } = useBracket(series);

  const [restarting, setRestarting] = useState(false);

  const handleRestart = async () => {
    try {
      setRestarting(true);
      const fresh = await fetchSeriesBatch(bracketSize);
      restart(shuffleArray(fresh));
    } finally {
      setRestarting(false);
    }
  };

  if (champion) {
    return (
      <SafeAreaView style={styles.container} edges={['bottom']}>
        <ScrollView
          contentContainerStyle={styles.championContainer}
          showsVerticalScrollIndicator={false}
        >
          <Text style={styles.championLabel}>ЧЕМПИОН</Text>

          <View style={styles.championCard}>
            <Image
              source={{ uri: champion.poster }}
              style={styles.championPoster}
              resizeMode="cover"
            />
            <LinearGradient
              colors={['transparent', 'rgba(11,15,25,0.95)']}
              style={styles.championGradient}
            />
            <View style={styles.championInfo}>
              <Text style={styles.championTitle} numberOfLines={2}>
                {champion.title}
              </Text>
              {champion.genre && (
                <Text style={styles.championGenre} numberOfLines={1}>
                  {champion.genre}
                </Text>
              )}
              {champion.rating !== undefined && (
                <Text style={styles.championRating}>
                  {champion.rating} / 10
                </Text>
              )}
            </View>
          </View>

          <View style={styles.championActions}>
            <Button
              title={restarting ? 'Загрузка...' : 'Начать заново'}
              symbol="↻"
              variant="danger"
              onPress={handleRestart}
              disabled={restarting}
            />
            <Button title="На главную" variant="outline" onPress={onExit} />
          </View>

          <Text style={styles.credit}>
            Данные и постеры предоставлены TMDB
          </Text>
        </ScrollView>
      </SafeAreaView>
    );
  }

  if (!currentMatch) {
    return (
      <View style={styles.center}>
        <Text style={styles.muted}>Загрузка...</Text>
      </View>
    );
  }

  return (
    <SafeAreaView style={styles.container} edges={['bottom']}>
      <ScrollView
        contentContainerStyle={styles.content}
        showsVerticalScrollIndicator={false}
      >
        <View style={getContainerStyle()}>
          <ProgressBar
            current={progress.current}
            total={progress.total}
            percent={progress.percent}
            roundName={progress.roundName}
          />

          <Text style={styles.question}>Кто дальше?</Text>

          <MatchCard match={currentMatch} onSelect={selectWinner} />

          <View style={styles.actions}>
            {canGoBack ? (
              <Button
                title="Назад"
                symbol="←"
                variant="outline"
                onPress={goBack}
              />
            ) : (
              <View style={{ flex: 1 }} />
            )}
            <Button
              title={restarting ? 'Загрузка...' : 'Заново'}
              symbol="↻"
              variant="danger"
              onPress={handleRestart}
              disabled={restarting}
            />
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.bg,
  },
  content: {
    paddingVertical: Spacing.md,
  },
  center: {
    flex: 1,
    backgroundColor: Colors.bg,
    alignItems: 'center',
    justifyContent: 'center',
    padding: Spacing.lg,
    gap: Spacing.md,
  },
  muted: {
    color: Colors.textMuted,
    fontSize: fontScale(15),
  },
  errorText: {
    color: Colors.danger,
    fontSize: fontScale(15),
    textAlign: 'center',
  },
  question: {
    color: Colors.text,
    fontSize: fontScale(18),
    fontWeight: '800',
    textAlign: 'center',
    marginBottom: Spacing.lg,
  },
  actions: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: Spacing.xl,
    gap: Spacing.sm,
  },
  championContainer: {
    flexGrow: 1,
    padding: Spacing.lg,
    paddingVertical: Spacing.xl,
    alignItems: 'center',
    justifyContent: 'center',
  },
  championLabel: {
    color: Colors.gold,
    fontSize: fontScale(13),
    fontWeight: '800',
    letterSpacing: 3,
    marginBottom: Spacing.lg,
  },
  championCard: {
    width: CHAMPION_WIDTH,
    height: CHAMPION_HEIGHT,
    borderRadius: 24,
    overflow: 'hidden',
    backgroundColor: Colors.card,
    borderWidth: 2,
    borderColor: Colors.gold,
  },
  championPoster: {
    width: '100%',
    height: '100%',
  },
  championGradient: {
    position: 'absolute',
    left: 0,
    right: 0,
    bottom: 0,
    height: '55%',
  },
  championInfo: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    padding: Spacing.md,
  },
  championTitle: {
    color: Colors.text,
    fontSize: fontScale(22),
    fontWeight: '900',
    marginBottom: 4,
  },
  championGenre: {
    color: Colors.textMuted,
    fontSize: fontScale(13),
    fontWeight: '600',
    marginBottom: 6,
  },
  championRating: {
    color: Colors.gold,
    fontSize: fontScale(15),
    fontWeight: '800',
  },
  championActions: {
    marginTop: Spacing.xl,
    width: CHAMPION_WIDTH,
    gap: Spacing.sm,
  },
  credit: {
    color: Colors.textMuted,
    fontSize: fontScale(10),
    textAlign: 'center',
    marginTop: Spacing.lg,
    opacity: 0.6,
  },
});