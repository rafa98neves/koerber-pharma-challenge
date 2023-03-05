import axios, { AxiosHeaders } from 'axios';
import type { AxiosInstance, AxiosRequestConfig } from 'axios';
import { useAuthStore } from '../store/authStore';

/**
 * Simple HTTP Service
 *
 * Creates an axios instance and sets the headers.
 *
 * Provides a get, put, post and delete methods to be used
 * externally
 */
export class HttpService {
  private axios: AxiosInstance;

  private authStore = useAuthStore();

  constructor(baseUrl: string) {
    this.axios = axios.create({
      baseURL: baseUrl,
      headers: this.getHeaders(),
    });
  }

  protected getHeaders() {
    const token = this.authStore.userData?.token;
    const headers: Partial<AxiosHeaders> = {
      'Content-Type': 'application/json',
    };
    if (token) {
      headers['Authorization'] = `Bearer ${token}`;
    }
    return headers;
  }

  // ------------------------- HTTP methods requests shortcuts ---------------------------
  public get<T>(url: string, options: Partial<AxiosRequestConfig<T>> = {}) {
    return this.axios.get<T>(url, options).then((res) => res.data);
  }

  public post<T>(url: string, payload: T, options: Partial<AxiosRequestConfig<T>> = {}) {
    return this.axios.post<T>(url, payload, options).then((res) => res.data);
  }

  public put<T>(url: string, payload: T, options: Partial<AxiosRequestConfig<T>> = {}) {
    return this.axios.put<T>(url, payload, options).then((res) => res.data);
  }

  public delete<T>(url: string, options: Partial<AxiosRequestConfig<T>> = {}) {
    return this.axios.delete<T>(url, options).then((res) => res.data);
  }
}
