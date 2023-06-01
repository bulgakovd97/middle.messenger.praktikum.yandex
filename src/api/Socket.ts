import { store } from '@/shared/utils/Store';

export class Socket {
  private _socket: WebSocket;

  constructor(userId: number, chatId: number, token: string) {
    this._socket = new WebSocket(`wss://ya-praktikum.tech/ws/chats/${userId}/${chatId}/${token}`);
  }

  connect() {
    this._socket.addEventListener('open', () => {
      console.log('Соединение установлено');
    });

    this._socket.addEventListener('close', (event) => {
      if (event.wasClean) {
        console.log('Соединение закрыто чисто');
      } else {
        console.log('Обрыв соединения');
      }

      console.log(`Код: ${event.code} | Причина: ${event.reason}`);
    });

    this._socket.addEventListener('message', (event) => {
      let messages: unknown;

      try {
        messages = JSON.parse(event.data);

        store.set('messages.data', messages);
      } catch (error) {
        console.log(error);
      }
    });

    this._socket.addEventListener('error', () => {
      console.log('Ошибка');
    });
  }

  sendMessage(message: string) {
    this._socket.send(JSON.stringify({
      content: message,
      type: 'message',
    }));
  }

  getMessages(offset: string) {
    if (this._socket.readyState === 1) {
      this._socket.send(JSON.stringify({
        content: offset,
        type: 'get old',
      }));
    }
  }

  ping() {
    this._socket.send(JSON.stringify({
      type: 'ping',
    }));
  }
}
