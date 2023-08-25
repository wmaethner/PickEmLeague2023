import { useRootNavigationState, useRouter, useSegments } from 'expo-router';
import React, { createContext, useContext, useEffect } from 'react';

import { AuthResult } from '../apis/models/AuthResult';
import { useLogin } from '../hooks/auth/useLogin';
import { RegisterData, useRegister } from '../hooks/auth/useRegister';
import storage from '../utils/storage';
import { useLogging } from './logging';

export type AuthContextData = {
  signIn: (username: string, password: string) => Promise<boolean>;
  signOut: () => void;
  register: (registerData: RegisterData) => Promise<boolean>;
  authData: string;
  errorMessage: string;
}

const AuthContext = createContext<AuthContextData>(null);

// This hook can be used to access the user info.
export function useAuth() {
  return useContext(AuthContext);
}

// This hook will protect the route access based on user authentication.
function useProtectedRoute(auth) {
  const router = useRouter();
  const segments = useSegments();
  const navigationState = useRootNavigationState();

  useEffect(() => {
    if (!navigationState?.key) return;

    const inAuthGroup = segments[0] === "auth";

    // This structure may differ from other implementations. 
    if (auth && segments.length === 0) {
      router.push("/(home)/home");
      return;
    } else if (!auth && segments.length === 0) {
      router.push("auth/sign-in");
      return;
    } else if (!auth && !inAuthGroup) {
      router.push("auth/sign-in");
      return;
    } else if (auth && inAuthGroup) {
      router.replace("/(home)/home");
      return;
    }
  }, [auth, segments, navigationState]);
}

export function AuthProvider(props) {
  const [authData, setAuth] = React.useState(null);
  const [errorMessage, setErrorMessage] = React.useState(null);
  const { addLog } = useLogging();

  const handleLogin = async (username: string, password: string): Promise<boolean> => {
    await addLog(`Auth provider handle login ${username} - ${password}`);
    const result = await useLogin(username, password);
    await addLog(`Auth provider handle login result ${result.success}`);
    return handleAuthResult(result);
  }

  const handleRegister = async (registerData: RegisterData): Promise<boolean> => {
    const result = await useRegister(registerData);
    return await handleAuthResult(result);
  }

  const handleAuthResult = async (result: AuthResult): Promise<boolean> => {
    if (result?.success) {
      setAuth(result.data.token);
      await storage.save({ key: 'bearerToken', data: result.data.token })
      setErrorMessage(null);
    } else {
      setAuth(null);
      setErrorMessage(result.message);
    }
    return result?.success;
  }

  useProtectedRoute(authData);

  return (
    <AuthContext.Provider
      value={{
        signIn: (username: string, password: string) => handleLogin(username, password),
        signOut: () => setAuth(null),
        register: (registerData: RegisterData) => handleRegister(registerData),
        authData,
        errorMessage
      }}>
      {props.children}
    </AuthContext.Provider>
  );
}
