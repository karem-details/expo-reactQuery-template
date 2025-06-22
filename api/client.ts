import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import * as SecureStore from 'expo-secure-store';

// Switch between dev and production URLs
let baseURL: string = __DEV__
  ? 'https://amer-laravel.detailslocal.com/api/ar/technician/'
  : 'https://amer-laravel.detailslocal.com/api/ar/technician/';

// Create axios instance with base configuration
export const axiosClient = axios.create({
  baseURL,
  //timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Store token securely
export const storeToken = async (accessToken: string) => {
  try {
    await SecureStore.setItemAsync('accessToken', accessToken);
    return true;
  } catch (error) {
    console.error('Error storing tokens:', error);
    return false;
  }
};

// Clear token on logout
export const clearToken = async (): Promise<boolean> => {
  try {
    await SecureStore.deleteItemAsync('accessToken');
    return true;
  } catch (error) {
    console.error('Error clearing tokens:', error);
    return false;
  }
};

// Get the stored access token
export const getAccessToken = async (): Promise<string | null> => {
  try {
    return await SecureStore.getItemAsync('accessToken');
  } catch (error) {
    console.error('Error retrieving access token:', error);
    return null;
  }
};

// Add request interceptor to attach token
axiosClient.interceptors.request.use(
  async (config) => {
    let url = config.baseURL;
    let lang = await AsyncStorage.getItem('lang');
    if (url && lang) {
      const urlParts = url.split('/');

      if (config?.url?.includes('agents')) {
        const technicianIndex = urlParts.findIndex(
          (part) => part === 'technician'
        );
        urlParts[technicianIndex] = 'x';
      }
      const langIndex = urlParts.findIndex(
        (part) => part === 'ar' || part === 'en'
      );

      if (langIndex !== -1) {
        urlParts[langIndex] = lang;
        url = urlParts.filter((part) => part !== 'x').join('/');
      }
    }
    const token = await getAccessToken();
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    config.baseURL = url;
    console.log('# REQUEST URL -> ' + config?.baseURL + config?.url);
    return config;
  },
  (error) => Promise.reject(error)
);

export default axiosClient;
