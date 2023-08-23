import { createContext, useContext, useEffect, useState } from "react";
import { useLogin } from "../hooks/auth/useLogin";

type AuthData = {
  accessToken: string;
  user: string;
}

type AuthContextData = {
  authData?: AuthData;
  accessToken?: string;
  login(username: string, password: string): Promise<boolean>;
  loggedIn(): Promise<boolean>;
  // signOut(): void;
};

const AuthContext = createContext<AuthContextData>({} as AuthContextData);

const AuthProvider = ({ children }) => {
  const [accessToken, setAccessToken] = useState(undefined);
  const [authData, setAuthData] = useState<AuthData>();

  useEffect(() => {
    console.log(accessToken);
  }, [])

  const login = async (username: string, password: string): Promise<boolean> => {
    try {
      const response = await useLogin(username, password);
      console.log(response.token);
      setAccessToken(response.token);
      setAuthData({
        accessToken: response.token,
        user: 'User'
      });
      return response.success;
    } catch (err) {
      console.log(`Login error: ${err}`);
    }
  }

  const loggedIn = async (): Promise<boolean> => {
    return accessToken !== '';
  }

  return (
    <AuthContext.Provider value={{ authData, accessToken, login, loggedIn }}>
      {children}
    </AuthContext.Provider>
  );
};

function useAuth(): AuthContextData {
  const context = useContext(AuthContext);

  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }

  return context;
}

export { AuthContext, AuthProvider, useAuth };
