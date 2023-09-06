import { Link } from 'expo-router';
import { useEffect, useState } from 'react';
import { Pressable, SafeAreaView, Text, TextInput, View } from 'react-native';
import { useAuth } from '../../context/auth';
import { useLogging } from '../../context/logging';
import { styles } from '../../utils/styles';

export default function SignIn() {
  const [username, setUsername] = useState('');
  const [password, setpassword] = useState('');
  const { signIn, errorMessage } = useAuth();
  const { logs, addLog, clearLogs } = useLogging();

  useEffect(() => {
    // addLog("sign in use effect");
  }, [])

  const handleClear = () => {
    clearLogs();
  }

  const handleLogin = async () => {
    await signIn(username, password);
  }

  return (
    <SafeAreaView style={{ flex: 1, justifyContent: 'center', alignItems: 'stretch' }}>
      {
        errorMessage &&
        <Text style={[styles.text, { backgroundColor: 'red' }]}>{errorMessage}</Text>
      }
      <Text style={styles.title}>Pick Em League 2023</Text>
      <View style={styles.container}>
        <Text style={styles.label}>Username:</Text>
        <TextInput
          style={[styles.input, { flex: 4 }]}
          onChangeText={setUsername}
          value={username}
          autoCapitalize='none'
          autoComplete='username'
        />
      </View>
      <View style={styles.container}>
        <Text style={styles.label}>Password:</Text>
        <TextInput
          style={[styles.input, { flex: 4 }]}
          onChangeText={setpassword}
          value={password}
          autoCapitalize='none'
          autoComplete='current-password'
          secureTextEntry={true}
        />
      </View>
      <View style={styles.containerEven}>
        <Pressable style={styles.button} onPress={handleLogin}>
          <Text style={styles.text}>Sign In</Text>
        </Pressable>
        <Link replace href="auth/register" asChild>
          <Pressable style={styles.button}>
            <Text style={styles.text}>Register</Text>
          </Pressable>
        </Link>
      </View>
    </SafeAreaView>
  );
}
