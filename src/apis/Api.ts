import AsyncStorage from '@react-native-async-storage/async-storage';
import axios, { AxiosError } from 'axios';
import { CommonActions } from '@react-navigation/native';
import { navigationRef } from '../screen';
import { ToastMessage } from '../component/toast';

const api = axios.create({
  baseURL: 'https://gorest.co.in/public/v2',
  timeout: 120000,
});

api.interceptors.request.use(async config => {
  const token = await AsyncStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

api.interceptors.response.use(
  response => response,
  async (error: AxiosError<any>) => {
    if (error.response?.status === 401) {
      ToastMessage({
        type: 'error',
        message: '🚨 You are not authorized',
      });

      await AsyncStorage.clear();

      navigationRef.current?.dispatch(
        CommonActions.reset({
          index: 0,
          routes: [{ name: 'Login' }],
        }),
      );
    }
    return Promise.reject(error);
  }
);


export const callGetApi = (url: string, headers?: any) => {
  return api.get(url, { headers });
};

export const callPostApi = (url: string, body?: object, headers?: any) => {
  return api.post(url, body, { headers });
};

export const callPutApi = (url: string, body?: object, headers?: any) => {
  return api.put(url, body, { headers });
};

export const callDeleteApi = (url: string, headers?: any) => {
  return api.delete(url, { headers });
};
