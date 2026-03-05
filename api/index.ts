import axios, { CreateAxiosDefaults, isCancel } from 'axios';
import qs from 'qs';
import { createBaseResponseSchema } from '@/api/schemas';
import { z } from 'zod';

let isRefreshing = false;
let failedQueue: (() => void)[] = [];

const apiSettings: CreateAxiosDefaults = {
  baseURL: 'https://dummyjson.com/',
  timeout: 30000,
  headers: { 'Content-Type': 'application/json' },
  formSerializer: {
    indexes: null,
  },
  paramsSerializer: (params) =>
    qs.stringify(params, { indices: false, skipNulls: true, allowDots: true }),
};

export const api = axios.create(apiSettings);

function isNetworkErrorLocal(error: any) {
  return !error?.response || error?.code === 'ECONNABORTED';
}

// api.interceptors.request.use(
//   async (config) => {
//     return config;
//   },
//   async (error) => {
//     return Promise.reject(error);
//   }
// );
//
// api.interceptors.response.use(
//   async (response) => {
//     return response;
//   },
//   async (error) => {
//
//     const originalRequest = error.config;
//
//     // If axios cancellation
//     if (isCancel(error)) {
//       return;
//     }
//
//     // If it's a 401 from protected endpoint, attempt refresh
//     if (error?.response?.status === 401 && !originalRequest._retry) {
//       if (isRefreshing) {
//         return new Promise<void>((resolve) => {
//           failedQueue.push(() => resolve());
//         }).then(() => api(originalRequest));
//       }
//
//       originalRequest._retry = true;
//       isRefreshing = true;
//
//       try {
//         await useAuthStore.getState().refreshSession();
//         failedQueue.forEach((cb) => cb());
//         failedQueue = [];
//         return api(originalRequest);
//       } catch (err: any) {
//         // If refreshSession determined refresh-invalid (401) and logged out, propagate
//         if (err?.response?.status === 401) {
//           await useAuthStore.getState().logout();
//           return Promise.reject(err);
//         }
//
//         // Network or transient error: do not force logout here; set store to OFFLINE if not already
//         if (isNetworkErrorLocal(err)) {
//           try {
//             useAuthStore.getState().setState(AuthState.AUTHENTICATED_OFFLINE);
//           } catch (e) {
//             // ignore
//           }
//           failedQueue = [];
//           return Promise.reject(err);
//         }
//
//         failedQueue = [];
//         return Promise.reject(err);
//       } finally {
//         isRefreshing = false;
//       }
//     }
//
//     logger.log('API Axios Error:', JSON.stringify(error, null, 2));
//     logger.log('API Axios Error Response:', JSON.stringify(error.response, null, 2));
//
//     // convert various axios errors into friendly APIError
//     let errorMessage = 'Bilinmeyen teknik bir sorun oluştu';
//     let resCode: string | undefined;
//     let statusCode: number | null = error.response?.status ?? null;
//     let data = null;
//
//     // TIMEOUT
//     if (error.code === 'ECONNABORTED') {
//       errorMessage = 'İstek zaman aşımına uğradı';
//     } else if (error.response) {
//       Telemetry.Error.addLog(`API Error Response: ${JSON.stringify(error.response, null, 2)}`);
//
//       statusCode = error.status ? error.status : (error.response?.status ?? null);
//
//       const responseSchema = createBaseResponseSchema(z.unknown());
//
//       const result = await responseSchema.safeParseAsync(error.response.data);
//
//       if (result.success) {
//         const responseData = result.data;
//         if (responseData.data) data = responseData.data;
//         if (responseData.resCode) resCode = responseData.resCode.toString();
//         if (responseData.message) errorMessage = responseData.message;
//         if (responseData.propertyErrors) {
//           if (
//             Object.values(responseData.propertyErrors).length > 0 &&
//             Object.values(responseData.propertyErrors)[0].length > 0
//           ) {
//             errorMessage = Object.values(responseData.propertyErrors)[0][0];
//           }
//         }
//       } else {
//         if (statusCode === 401) {
//           errorMessage = 'Oturumunuzun süresi doldu, girişe yönlendiriliyorsunuz';
//         }
//
//         if (statusCode === 403) {
//           errorMessage = 'Bu işlem için yetkiniz yok';
//         }
//
//         if (statusCode === 404) {
//           errorMessage = 'İstek bulunamadı';
//         }
//
//         if (statusCode && statusCode >= 500) {
//           errorMessage = 'Sistem bakımda. Lütfen tekrar deneyin';
//         }
//       }
//     } else if (error.request) {
//       errorMessage = 'Sisteme erişilemedi. Lütfen tekrar deneyin';
//     }
//
//     if (
//       process.env.EXPO_PUBLIC_APP_ENV !== 'production' &&
//       useAuthStore.getState().state !== AuthState.INITIAL_LOADING
//     ) {
//       try {
//         // showOnce: eğer halihazırda bir alert açıksa bu çağrı yok sayılacak
//         await AlertManager.showOnce({
//           title: 'API HATA RESPONSE',
//           // message: JSON.stringify(error.response, null, 2),
//           message: JSON.stringify(error, null, 2),
//           buttons: (resolve, reject) => [
//             {
//               text: 'Tamam',
//               onPress: () => resolve(true),
//             },
//           ],
//         });
//       } catch (e) {
//         // ignore
//       }
//     }
//
//     await Telemetry.Error.reportAxiosError(error, errorMessage, resCode);
//
//     const apiError = new APIError(errorMessage, {
//       data,
//       resCode,
//       statusCode,
//     });
//
//     return Promise.reject(apiError);
//   }
// );
