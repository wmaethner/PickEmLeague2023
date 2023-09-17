import React, { createContext, useContext, useState } from 'react';

import { UserSchema } from '../apis';
import { useGetCurrentUser } from '../hooks/useGetCurrentUser';

export type UserContextData = {
  setCurrentUser: () => void; 
  clearCurrentUser: () => void;
  UserData: UserSchema;
}

const UserContext = createContext<UserContextData>(null);

// This hook can be used to access the user info.
export function useUser() {
  return useContext(UserContext);
}

export function UserProvider(props) {
  const [UserData, setUser] = useState<UserSchema>(null);
  
  const setCurrentUser = async () => {
    const data = (await useGetCurrentUser()).data;
    setUser(data);
  }

  const clearCurrentUser = () => {
    setUser(null);
  }

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
