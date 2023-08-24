import { Slot } from 'expo-router';
import { AuthProvider } from '../context/auth';
import { LoggingProvider } from '../context/logging';

export default function Root() {
  return (
    // Setup the auth context and render our layout inside of it.
    <LoggingProvider>
      <AuthProvider>
        <Slot />
      </AuthProvider>
    </LoggingProvider>
  );
}
