import { Link } from 'expo-router';
import { useState } from 'react';
import { Pressable, SafeAreaView, ScrollView, Text, TextInput, View } from 'react-native';
import { useAuth } from '../../context/auth';
import { styles } from '../../utils/styles';

export default function Register() {
  const [first, setFirst] = useState('');
  const [last, setLast] = useState('');
  const [email, setEmail] = useState('');
  const [username, setUsername] = useState('');
  const [password, setpassword] = useState('');
  const { register, errorMessage } = useAuth();

  return (
    <SafeAreaView style={{ flex: 1, justifyContent: 'center', alignItems: 'stretch' }}>
      <ScrollView>
        {
          errorMessage &&
          <Text>{errorMessage}</Text>
        }
        <Text style={styles.title}>Registration</Text>
        <View style={styles.container}>
          <Text style={styles.label}>First Name:</Text>
          <TextInput
            style={[styles.input, { flex: 4 }]}
            onChangeText={setFirst}
            value={first}
          />
        </View>
        <View style={styles.container}>
          <Text style={styles.label}>Last Name:</Text>
          <TextInput
            style={[styles.input, { flex: 4 }]}
            onChangeText={setLast}
            value={last}
          />
        </View>
        <View style={styles.container}>
          <Text style={styles.label}>Email:</Text>
          <TextInput
            style={[styles.input, { flex: 4 }]}
            onChangeText={setEmail}
            value={email}
            autoCapitalize='none'
          />
        </View>
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
          <Pressable
            style={styles.button}
            onPress={() =>
              register({
                firstName: first,
                lastName: last,
                email: email,
                username: username,
                password: password
              })}>
            <Text style={styles.text}>Register</Text>
          </Pressable>
          <Link replace href="auth/sign-in" asChild>
            <Pressable style={styles.button}>
              <Text style={styles.text}>Back</Text>
            </Pressable>
          </Link>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
