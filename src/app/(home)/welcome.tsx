import { Pressable, SafeAreaView, Text, View } from 'react-native';

import { useAuth } from '../../context/auth';
import { styles } from '../../utils/styles';

export default function WelcomeScreen() {
  const { signOut } = useAuth();

  const handleLogout = async () => {
    await signOut();
  }

  return (
    <SafeAreaView style={{ flex: 1, flexDirection: 'column', justifyContent: 'center', alignItems: 'center' }}>
      <View style={{ flex: 3, justifyContent: 'center', alignItems: 'center' }}>
        <Text style={styles.title}>
          Welcome to the 2023 season!
        </Text>
        <Text style={styles.title}>
          Come back soon...
        </Text>
      </View>
      <View style={{ flex: 3, justifyContent: 'center', alignItems: 'center' }}>
        <Pressable style={styles.button} onPress={handleLogout}>
          <Text style={styles.text}>Sign Out</Text>
        </Pressable>
      </View>
    </SafeAreaView>
  );
}