import { SafeAreaView, ScrollView, Text } from 'react-native';

import { useAuth } from '../../context/auth';
import { useLogging } from '../../context/logging';

export default function Home() {
  const { signOut, authData } = useAuth();
  const { logs, addLog, clearLogs } = useLogging();
  
  return (
    <SafeAreaView style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Text>{authData}</Text>
      <ScrollView>
        {logs.map((log, index) => (
          <Text key={index}>
            {log}
          </Text>
        ))}
      </ScrollView>
      <Text onPress={() => signOut()}>Sign Out</Text>
    </SafeAreaView>
  );
}