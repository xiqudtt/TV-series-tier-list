import { View, Text, StyleSheet, Pressable, ScrollView } from 'react-native';
import { useRouter } from 'expo-router';
import { LinearGradient } from 'expo-linear-gradient';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Colors } from '../theme/colors';
import { fontScale, getContainerStyle, Spacing } from '../theme/layout';
import * as Haptics from 'expo-haptics';

const OPTIONS = [
  {
    size: 64 as const,
    title: 'Быстрый турнир',
    subtitle: '64 сериала',
    gradient: ['#7C5CFF', '#4A9EFF'] as const,
  },
  {
    size: 128 as const,
    title: 'Марафон',
    subtitle: '128 сериалов',
    gradient: ['#FF5C7A', '#FF9F1C'] as const,
  },
];

export default function HomeScreen() {
  const router = useRouter();

  const handleSelect = (size: 64 | 128) => {
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);
    router.push(`/bracket?size=${size}`);
  };

  return (
    <SafeAreaView style={styles.container} edges={['bottom']}>
      <ScrollView
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        <View style={[styles.content, getContainerStyle()]}>
          <View style={styles.hero}>
            <Text style={styles.title}>TV Series</Text>
            <Text style={styles.titleAccent}>Tier List</Text>
            <Text style={styles.subtitle}>Выбери лучший сериал в турнире</Text>
          </View>

          <View style={styles.options}>
            {OPTIONS.map((opt) => (
              <Pressable
                key={opt.size}
                onPress={() => handleSelect(opt.size)}
                style={({ pressed }) => [
                  styles.optionWrapper,
                  pressed && { transform: [{ scale: 0.98 }] },
                ]}
              >
                <LinearGradient
                  colors={[...opt.gradient]}
                  start={{ x: 0, y: 0 }}
                  end={{ x: 1, y: 1 }}
                  style={styles.option}
                >
                  <View style={styles.optionContent}>
                    <Text style={styles.optionTitle}>{opt.title}</Text>
                    <Text style={styles.optionSubtitle}>{opt.subtitle}</Text>
                  </View>
                  <Text style={styles.optionArrow}>→</Text>
                </LinearGradient>
              </Pressable>
            ))}
          </View>

          <View style={styles.footerBlock}>
            <Text style={styles.footer}>Выбирай победителя в каждой паре</Text>
            <Text style={styles.credit}>
              This product uses the TMDB API but is not endorsed or certified by TMDB.
            </Text>
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
  scrollContent: {
    flexGrow: 1,
  },
  content: {
    flex: 1,
    justifyContent: 'space-between',
    paddingVertical: Spacing.xl,
    minHeight: '100%',
  },
  hero: {
    alignItems: 'center',
    marginTop: Spacing.xl,
    marginBottom: Spacing.xl,
  },
  title: {
    fontSize: fontScale(34),
    fontWeight: '900',
    color: Colors.text,
    letterSpacing: -1,
  },
  titleAccent: {
    fontSize: fontScale(34),
    fontWeight: '900',
    color: Colors.accent,
    letterSpacing: -1,
    marginTop: -6,
    marginBottom: Spacing.md,
  },
  subtitle: {
    fontSize: fontScale(15),
    color: Colors.textMuted,
    textAlign: 'center',
    lineHeight: fontScale(22),
    paddingHorizontal: Spacing.md,
  },
  options: {
    gap: Spacing.md,
    marginBottom: Spacing.xl,
  },
  optionWrapper: {
    borderRadius: 20,
    overflow: 'hidden',
    shadowColor: Colors.accent,
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.25,
    shadowRadius: 14,
    elevation: 6,
  },
  option: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: Spacing.lg,
    borderRadius: 20,
    minHeight: 80,
  },
  optionContent: {
    flex: 1,
  },
  optionTitle: {
    color: Colors.text,
    fontSize: fontScale(17),
    fontWeight: '800',
    marginBottom: 4,
  },
  optionSubtitle: {
    color: 'rgba(255,255,255,0.85)',
    fontSize: fontScale(13),
    fontWeight: '500',
  },
  optionArrow: {
    color: Colors.text,
    fontSize: fontScale(22),
    fontWeight: '700',
    marginLeft: Spacing.md,
  },
  footerBlock: {
    marginTop: 'auto',
    paddingTop: Spacing.lg,
  },
  footer: {
    color: Colors.textMuted,
    fontSize: fontScale(13),
    textAlign: 'center',
    lineHeight: fontScale(20),
  },
  credit: {
    color: Colors.textMuted,
    fontSize: fontScale(10),
    textAlign: 'center',
    marginTop: Spacing.sm,
    opacity: 0.6,
    paddingHorizontal: Spacing.sm,
  },
});