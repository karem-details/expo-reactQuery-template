import AsyncStorage from '@react-native-async-storage/async-storage';
import React, {
  createContext,
  useState,
  PropsWithChildren,
  useEffect,
} from 'react';
import * as SecureStore from 'expo-secure-store';
import { getAccessToken } from '@/api/client';

export type userType = {
  id: string;
  full_name: string;
  fname: string;
  lname: string;
  email: string;
  mobile: string;
  photo?: string;
  token: string;
};

type companyType = {
  id: number;
  logo_url: string;
  name: string;
  en_name: string;
  slug: string;
};

type AuthContextType = {
  user: userType | null;
  company: companyType | null;
  isLoading: boolean;
  login: (data: userType) => void;
  logout: () => void;
  registerCompany: (data: companyType) => void;
};

export const AuthContext = createContext<AuthContextType>({
  user: null,
  isLoading: true,
  company: null,
  login: () => {},
  logout: () => {},
  registerCompany: () => {},
});

export const AuthProvider: React.FC<PropsWithChildren> = ({ children }) => {
  const [user, setUser] = useState<userType | null>(null);
  const [company, setCompany] = useState<companyType | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  // Check if user is logged in
  useEffect(() => {
    const checkAuth = async () => {
      try {
        const token = await getAccessToken();
        if (!token) {
          return;
        }
        const data = await AsyncStorage.getItem('user');
        if (data) {
          setUser(JSON.parse(data));
        }
      } catch (error) {
        console.error('Authentication check failed:', error);
      } finally {
        setIsLoading(false);
      }
    };
    checkAuth();
  }, []);

  const login = async (data: userType) => {
    if (data.token) {
      await SecureStore.setItemAsync('accessToken', data.token);
      await AsyncStorage.setItem(
        'user',
        JSON.stringify({ ...data, token: undefined })
      );
    }
    setUser(data);
  };

  const registerCompany = async (data: companyType) => {
    await AsyncStorage.setItem('company', JSON.stringify(data));
    setCompany(data);
  };

  const logout = async () => {
    await AsyncStorage.clear();
    await SecureStore.deleteItemAsync('accessToken');
    setUser(null);
  };

  return (
    <AuthContext.Provider
      value={{ user, isLoading, login, logout, company, registerCompany }}
    >
      {children}
    </AuthContext.Provider>
  );
};
