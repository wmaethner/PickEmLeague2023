import { Slot } from 'expo-router';
import { SafeAreaView } from 'react-native';
import { MenuProvider } from 'react-native-popup-menu';
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
          <MenuProvider>
            <AppBackground>
              <SafeAreaView style={{ flex: 1, flexDirection: 'column' }}>
                <Slot />
              </SafeAreaView>
            </AppBackground>
          </MenuProvider>
        </AuthProvider>
      </UserProvider>
    </LoggingProvider>
  );
}
