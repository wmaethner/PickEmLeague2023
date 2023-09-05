import { Slot } from 'expo-router';
import { SafeAreaView } from 'react-native';
import AppBackground from '../components/appBackground';
import { AuthProvider } from '../context/auth';
import { LoggingProvider } from '../context/logging';
import { UserProvider } from '../context/user';

export default function Root() {
  return (
    // Setup the auth context and render our layout inside of it.
    <LoggingProvider>
      <UserProvider>
        <AuthProvider>
          <AppBackground>
            <SafeAreaView style={{ flex: 1, flexDirection: 'column' }}>
              <Slot />
            </SafeAreaView>
          </AppBackground>
        </AuthProvider>
      </UserProvider>
    </LoggingProvider>
  );
}
