import 'react-native-reanimated';
import { Stack } from 'expo-router';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { StatusBar } from 'expo-status-bar';
import { Colors } from '../theme/colors';

export default function RootLayout() {
  return (
    <GestureHandlerRootView style={{ flex: 1, backgroundColor: Colors.bg }}>
      <StatusBar style="light" />
      <Stack
        screenOptions={{
          headerStyle: { backgroundColor: Colors.bg },
          headerTintColor: Colors.text,
          headerTitleStyle: { fontWeight: '700' },
          headerShadowVisible: false,
          contentStyle: { backgroundColor: Colors.bg },
        }}
      >
        <Stack.Screen name="index" options={{ title: 'TV Series Tier List' }} />
        <Stack.Screen name="bracket" options={{ title: 'Турнир' }} />
      </Stack>
    </GestureHandlerRootView>
  );
}