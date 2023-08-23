import { Text, View } from 'react-native';

import { useAuth } from '../../context/auth';

export default function Home() {
  const { signOut, authData } = useAuth();
  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Text>{authData}</Text>
      <Text onPress={() => signOut()}>Sign Out</Text>
    </View>
  );
}