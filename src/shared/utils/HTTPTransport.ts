/* eslint-disable prefer-promise-reject-errors */
import { queryStringify } from '../lib';

export enum METHODS {
  GET = 'GET',
  POST = 'POST',
  PUT = 'PUT',
  PATCH = 'PATCH',
  DELETE = 'DELETE',
}

interface Options {
  method?: METHODS;
  data?: unknown;
  headers?: Record<string, string>;
  timeout?: number;
}

export default class HTTPTransport {
  static API_URL = 'https://ya-praktikum.tech/api/v2';
  protected endpoint: string;

  constructor(endpoint: string) {
    this.endpoint = `${HTTPTransport.API_URL}${endpoint}`;
  }

  public get<Response>(url: string, options: Options = {}): Promise<Response> {
    const { data, timeout } = options;

    const queryUrl = data ? `${url}${queryStringify(data)}` : url;

    return this.request<Response>(this.endpoint + queryUrl, { ...options, method: METHODS.GET }, timeout);
  }

  public post<Response>(url: string, options: Options = {}): Promise<Response> {
    return this.request<Response>(this.endpoint + url, { ...options, method: METHODS.POST }, options.timeout);
  }

  public put<Response>(url: string, options: Options = {}): Promise<Response> {
    return this.request<Response>(this.endpoint + url, { ...options, method: METHODS.PUT }, options.timeout);
  }

  public patch<Response>(url: string, options: Options = {}): Promise<Response> {
    return this.request<Response>(this.endpoint + url, { ...options, method: METHODS.PATCH }, options.timeout);
  }

  public delete<Response>(url: string, options: Options = {}): Promise<Response> {
    return this.request<Response>(this.endpoint + url, { ...options, method: METHODS.DELETE }, options.timeout);
  }

  private request<Response>(url: string, options: Options = {}, timeout = 5000): Promise<Response> {
    const {
      method,
      data,
    } = options;

    const isFormData = data instanceof FormData;

    return new Promise((resolve, reject) => {
      if (!method) {
        // eslint-disable-next-line prefer-promise-reject-errors
        reject('No method');
        return;
      }

      const xhr = new XMLHttpRequest();
      const isGet = method === METHODS.GET;

      xhr.open(method, url);

      xhr.onreadystatechange = () => {
        if (xhr.readyState === XMLHttpRequest.DONE) {
          if (xhr.status < 400) {
            resolve(xhr.response);
          } else {
            reject(xhr.response);
          }
        }
      };

      xhr.onabort = () => reject({ reason: 'abort' });
      xhr.onerror = () => reject({ reason: 'network error' });

      xhr.timeout = timeout;
      xhr.ontimeout = () => reject({ reason: 'timeout' });

      if (!isFormData) {
        xhr.setRequestHeader('Content-Type', 'application/json');
      }

      xhr.withCredentials = true;
      xhr.responseType = 'json';

      if (isGet || !data) {
        xhr.send();
      } else if (isFormData) {
        xhr.send(data);
      } else {
        xhr.send(JSON.stringify(data));
      }
    });
  }
}
