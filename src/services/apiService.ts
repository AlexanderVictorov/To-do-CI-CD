import { BASE_URL } from 'config';
import axios, { AxiosInstance, AxiosResponse } from 'axios';

export const $api:AxiosInstance = axios.create({
  withCredentials: true,
  baseURL: BASE_URL,
});

$api.interceptors.response.use(
  (response: AxiosResponse) => {
    // Do something with the response data
    console.log('Response was received');

    // You must return the response object in order to continue the response
    return response;
  },
  (error) => {
    // Do something with the response error
    console.error('Error in response interceptor:', error);
    return Promise.reject(error);
  }
)