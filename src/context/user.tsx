import React, { createContext, useContext, useState } from 'react';

// import { useLogin } from '../hooks/User/useLogin';
// import { RegisterData, useRegister } from '../hooks/User/useRegister';
import { UserData } from '../apis';
import { useGetCurrentUser } from '../hooks/useGetCurrentUser';
import { useLogging } from './logging';

export type UserContextData = {
  setCurrentUser: () => void; 
  clearCurrentUser: () => void;
  UserData: UserData;
}

const UserContext = createContext<UserContextData>(null);

// This hook can be used to access the user info.
export function useUser() {
  return useContext(UserContext);
}

export function UserProvider(props) {
  const [UserData, setUser] = useState(null);
  const [errorMessage, setErrorMessage] = useState(null);
  const { addLog } = useLogging();

  const setCurrentUser = async () => {
    console.log("set current user");
    const data = (await useGetCurrentUser()).data;
    // addLog(data.admin.toString());
    console.log(data);
    setUser(data);
  }

  const clearCurrentUser = () => {
    setUser(null);
  }
  // const handleLogin = async (username: string, password: string): Promise<boolean> => {
  //   await addLog(`User provider handle login ${username} - ${password}`);
  //   const result = await useLogin(username, password);
  //   await addLog(`User provider handle login result ${result.success}`);
  //   return handleUserResult(result);
  // }

  // const handleRegister = async (registerData: RegisterData): Promise<boolean> => {
  //   const result = await useRegister(registerData);
  //   return await handleUserResult(result);
  // }

  // const handleUserResult = async (result: UserResult): Promise<boolean> => {
  //   if (result?.success) {
  //     setUser(result.data.token);
  //     await storage.save({ key: 'bearerToken', data: result.data.token })
  //     setErrorMessage(null);
  //   } else {
  //     setUser(null);
  //     setErrorMessage(result.message);
  //   }
  //   return result?.success;
  // }


  return (
    <UserContext.Provider
      value={{
        setCurrentUser,
        clearCurrentUser,
        UserData
      }}>
      {props.children}
    </UserContext.Provider>
  );
}
