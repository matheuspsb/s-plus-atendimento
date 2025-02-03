import axios, { AxiosRequestConfig } from 'axios';

const axiosServices = axios.create({
  baseURL: 'https://mock-data-api-nextjs.vercel.app/'
})

axiosServices.interceptors.request.use(
  async (config) => {
      const accessToken = localStorage.getItem('serviceToken');
      if (accessToken) {
          config.headers['Authorization'] = `Bearer ${accessToken}`;
      }
      return config;
  },
  (error) => {
      return Promise.reject(error);
  }
);

axiosServices.interceptors.response.use(
  (response) => response,
  (error) => {
      if (error.response.status === 401 && !window.location.href.includes('/login')) {
          window.location.pathname = '/login';
      }
      return Promise.reject((error.response && error.response.data) || 'Wrong Services');
  }
);

export const fetcher = async (args: string | [string, AxiosRequestConfig]) => {
  const [url, config] = Array.isArray(args) ? args : [args];

  const res = await axiosServices.get(url, { ...config });

  return res.data;
};