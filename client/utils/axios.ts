import { COOKIE_KEYS, REQUEST_CONTENT_TYPE } from '@/constants/common';
import axios from 'axios';
import { deleteCookie, getCookie } from 'cookies-next';

const Axios = axios.create({
  baseURL: `${process.env.NEXT_PUBLIC_BACKEND_URL}`,
});

Axios.interceptors.request.use((config: any) => {
  const useToken = config?.withAuthToken ?? true;
  const token = getCookie(COOKIE_KEYS.token) || config?.tokenValue;
  const headers = config.headers;
  return {
    ...config,
    headers: {
      ...headers,
      'Content-Type': headers['Content-Type'] ?? REQUEST_CONTENT_TYPE,
      Authorization: useToken && token && `Bearer ${token}`,
    },
  };
});

Axios.interceptors.response.use((response: any) => {
  return response;
}, (error) => {
  if(error.response.status === 401) {
    Object.values(COOKIE_KEYS).forEach(el => {
      deleteCookie(el);
    })
    // window.location.href = '/';
    return false;
  };
  return Promise.reject(error);
});

export default Axios;
