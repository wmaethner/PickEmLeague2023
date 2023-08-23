import { Link } from 'expo-router';
import { useState } from 'react';
import { Pressable, SafeAreaView, Text, TextInput, View } from 'react-native';
import { useAuth } from '../../context/auth';
import { styles } from '../../utils/styles';

export default function SignIn() {
  const [username, setUsername] = useState('');
  const [password, setpassword] = useState('');
  const { signIn, errorMessage } = useAuth();

  return (
    <SafeAreaView style={{ flex: 1, justifyContent: 'center', alignItems: 'stretch' }}>
      {
        errorMessage &&
        <Text>{errorMessage}</Text>
      }
      <View style={styles.container}>
        <Text style={{ flex: 2, textAlign: 'center' }}>Username:</Text>
        <TextInput
          style={[styles.input, { flex: 4 }]}
          onChangeText={setUsername}
          value={username}
          autoCapitalize='none'
          autoComplete='username'
        />
      </View>
      <View style={styles.container}>
        <Text style={{ flex: 2, textAlign: 'center' }}>Password:</Text>
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
        <Pressable style={styles.button} onPress={() => signIn(username, password)}>
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
