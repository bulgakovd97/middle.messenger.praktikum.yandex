import sinon, { SinonFakeXMLHttpRequest, SinonFakeXMLHttpRequestStatic } from 'sinon';
import HTTPTransport from './HTTPTransport';
import { expect } from 'chai';

describe('HTTPTransport', () => {
  let xhr: SinonFakeXMLHttpRequestStatic;
  let instance: HTTPTransport;
  const requests: SinonFakeXMLHttpRequest[] = [];

  beforeEach(() => {
    xhr = sinon.useFakeXMLHttpRequest();

    // @ts-expect-error
    global.XMLHttpRequest = xhr;

    xhr.onCreate = (request: SinonFakeXMLHttpRequest) => {
      requests.push(request);
    };
  });

  afterEach(() => {
    requests.length = 0;
  });

  describe('.get()', () => {
    it('.get() should send GET request', () => {
      instance = new HTTPTransport('/auth');

      instance.get('/user');

      const [request] = requests;

      expect(request.method).to.eq('GET');
    });
  });

  describe('.post()', () => {
    it('.post() should send POST request', () => {
      instance = new HTTPTransport('/auth');

      instance.post('/logout');

      const [request] = requests;

      expect(request.method).to.eq('POST');
    });
  });

  describe('.put()', () => {
    it('.put() should send PUT request', () => {
      instance = new HTTPTransport('/chats');

      instance.put('/avatar');

      const [request] = requests;

      expect(request.method).to.eq('PUT');
    });
  });

  describe('.delete()', () => {
    it('.delete() should send DELETE request', () => {
      instance = new HTTPTransport('/chats');

      instance.delete('/users');

      const [request] = requests;

      expect(request.method).to.eq('DELETE');
    });
  });
});
