import { View, Text, Pressable, StyleSheet } from 'react-native';
import { useRouter } from 'expo-router';

export default function HomeScreen() {
  const router = useRouter();

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Выбери размер сетки</Text>
      <Pressable
        style={styles.button}
        onPress={() => router.push('/bracket?size=64')}
      >
        <Text style={styles.buttonText}>1x64</Text>
      </Pressable>
      <Pressable
        style={styles.button}
        onPress={() => router.push('/bracket?size=128')}
      >
        <Text style={styles.buttonText}>1x128</Text>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: 'center', alignItems: 'center', padding: 24 },
  title: { fontSize: 22, fontWeight: 'bold', marginBottom: 32 },
  button: {
    backgroundColor: '#6200EE',
    paddingVertical: 16,
    paddingHorizontal: 48,
    borderRadius: 12,
    marginBottom: 16,
    width: '100%',
    alignItems: 'center',
  },
  buttonText: { color: '#fff', fontSize: 18, fontWeight: '600' },
});