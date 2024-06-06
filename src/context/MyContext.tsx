// src/context/MyContext.tsx
import React, { createContext, useContext, useState, ReactNode } from 'react';

// Define the type of the context value
interface Owner {
  id: number;
  firstname: string;
  lastname: string;
  email: string;
  cnic: string;
  password: string;
}

interface User {
  id: number;
  firstname: string;
  lastname: string;
  email: string;
  password: string;
}

interface MyContextType {
  user: User;
  setUser: React.Dispatch<React.SetStateAction<User>>;
  owner: Owner;
  setOwner: React.Dispatch<React.SetStateAction<Owner>>;
}

// Create the context with a default value
const MyContext = createContext<MyContextType | undefined>(undefined);

// Create a provider component
export const MyContextProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User>({
    id: 0,
    firstname: '',
    lastname: '',
    email: '',
    password: ''
  });
  const [owner, setOwner] = useState<Owner>({
    id: 0,
    firstname: '',
    lastname: '',
    email: '',
    cnic: '',
    password: ''
  });

  return (
    <MyContext.Provider value={{ user, setUser, owner, setOwner }}>
      {children}
    </MyContext.Provider>
  );
};

// Custom hook for using the context
export const useMyContext = () => {
  const context = useContext(MyContext);
  if (context === undefined) {
    throw new Error('useMyContext must be used within a MyContextProvider');
  }
  return context;
};
