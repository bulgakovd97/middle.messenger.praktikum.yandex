export enum METHODS {
  GET = 'GET',
  POST = 'POST',
  PUT = 'PUT',
  PATCH = 'PATCH',
  DELETE = 'DELETE',
}

function queryStringify(data: any): string {
  const queryParamsArray = [];

  // eslint-disable-next-line no-restricted-syntax
  for (const [key, value] of Object.entries(data)) {
    queryParamsArray.push(`${key}=${value}`);
  }

  return `?${queryParamsArray.join('&')}`;
}

interface Options {
  method?: METHODS;
  data?: Record<string, unknown>;
  headers?: Record<string, string>;
}

export class HTTPTransport {
  get = (url: string, options: Options = {}, timeout?: number) => {
    return this.request(url, { ...options, method: METHODS.GET }, timeout);
  };

  post = (url: string, options: Options = {}, timeout?: number) => {
    return this.request(url, { ...options, method: METHODS.POST }, timeout);
  };

  put = (url: string, options: Options = {}, timeout?: number) => {
    return this.request(url, { ...options, method: METHODS.PUT }, timeout);
  };

  patch = (url: string, options: Options = {}, timeout?: number) => {
    return this.request(url, { ...options, method: METHODS.PATCH }, timeout);
  };

  delete = (url: string, options: Options = {}, timeout?: number) => {
    return this.request(url, { ...options, method: METHODS.DELETE }, timeout);
  };

  request = (url: string, options: Options = {}, timeout = 5000) => {
    const { headers = {}, method, data } = options;

    return new Promise((resolve, reject) => {
      if (!method) {
        // eslint-disable-next-line prefer-promise-reject-errors
        reject('No method');
        return;
      }

      const xhr = new XMLHttpRequest();
      const isGet = method === METHODS.GET;

      xhr.open(
        method,
        isGet && !!data
          ? `${url}${queryStringify(data)}`
          : url,
      );

      Object.keys(headers).forEach((key) => {
        xhr.setRequestHeader(key, headers[key]);
      });

      xhr.onload = function () {
        resolve(xhr);
      };

      xhr.onabort = reject;
      xhr.onerror = reject;

      xhr.timeout = timeout;
      xhr.ontimeout = reject;

      if (isGet || !data) {
        xhr.send();
      } else {
        xhr.send(JSON.stringify(data));
      }
    });
  };
}
