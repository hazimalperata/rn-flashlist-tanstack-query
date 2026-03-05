import { AxiosRequestConfig, AxiosResponse } from 'axios';
import { api } from '@/api/index';

export async function getRequest<T>(URL: string, config?: AxiosRequestConfig) {
  return api
    .get(`/${URL}`, config)
    .then((response: AxiosResponse<T>) => response?.data as T);
}

export async function postRequest<T>(
  URL: string,
  payload?: any,
  config?: AxiosRequestConfig<any>,
) {
  return api
    .post(`/${URL}`, payload, config)
    .then((response: AxiosResponse<T, any>) => response?.data as T);
}

export async function putRequest<T>(
  URL: string,
  payload?: any,
  config?: AxiosRequestConfig<any>,
) {
  return api
    .put(`/${URL}`, payload, config)
    .then((response: AxiosResponse<T, any>) => response?.data as T);
}

export async function deleteRequest<T>(
  URL: string,
  config?: AxiosRequestConfig<any>,
) {
  return api
    .delete(`/${URL}`, config)
    .then((response: AxiosResponse<T, any>) => response?.data as T);
}

export async function patchRequest<T>(
  URL: string,
  payload?: any,
  config?: AxiosRequestConfig<any>,
) {
  return api
    .patch(`/${URL}`, payload, config)
    .then((response: AxiosResponse<T, any>) => response?.data as T);
}

export async function postForm<T>(
  URL: string,
  payload?: any,
  config?: AxiosRequestConfig<any>,
) {
  return api
    .postForm(`/${URL}`, payload, config)
    .then((response: AxiosResponse<T, any>) => response?.data as T);
}
