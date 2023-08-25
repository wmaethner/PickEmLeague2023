import { Pressable, SafeAreaView, Text, View } from 'react-native';

import { useEffect } from 'react';
import { useAuth } from '../../context/auth';
import { useLogging } from '../../context/logging';
import { useGetCurrentUser } from '../../hooks/useGetCurrentUser';
import { styles } from '../../utils/styles';

export default function Home() {
  const { signOut, authData } = useAuth();
  const { logs, addLog, clearLogs } = useLogging();

  useEffect(() => {
    async function GetUser() {
      console.log("Get user");
      try {
        const result = await useGetCurrentUser();
        console.log(result.token.toString());
      } catch (err) {
        console.log(`Get user error ${err}`);
      }
    }
    
    console.log("HOME");
    GetUser();
  }, []);

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