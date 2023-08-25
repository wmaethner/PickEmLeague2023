import { Slot } from 'expo-router';
import { ImageBackground } from 'react-native';
import { AuthProvider } from '../context/auth';
import { LoggingProvider } from '../context/logging';
import { styles } from '../utils/styles';

export default function Root() {
  return (
    // Setup the auth context and render our layout inside of it.
    <LoggingProvider>
      <AuthProvider>
        <ImageBackground source={require('../../assets/background.jpeg')} resizeMode='cover' style={styles.image}>
          <Slot />
        </ImageBackground>
      </AuthProvider>
    </LoggingProvider>
  );
}
