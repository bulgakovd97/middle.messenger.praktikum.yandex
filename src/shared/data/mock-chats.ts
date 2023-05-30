export interface User {
  id: number;
  name: string;
  avatar: string;
  status: string;
  phone: string;
}

export type MessageType = 'text' | 'image' | 'doc' | 'audio' | 'video' | 'location';

export interface Message {
  messageId: number;
  sentAt: string;
  editedAt: string;
  type: MessageType;
  text: string;
}

export interface Chat {
  chatId: number;
  user: User,
  messages: Message[];
  lastVisitedAt: string;
  unread: number;
}

export const mockChats: Chat[] = [
  {
    chatId: 1,
    lastVisitedAt: '00:00',
    unread: 3,
    user: {
      id: 1,
      avatar: 'https://klike.net/uploads/posts/2019-07/medium/1564314090_3.jpg',
      name: 'Саша',
      phone: '89312403928',
      status: 'в отпуске',
    },
    messages: [
      {
        messageId: 123,
        editedAt: '00:00',
        sentAt: '00:00',
        type: 'image',
        text: 'тестовое сообщение, тестовое сообщение!',
      },
    ],
  },
  {
    chatId: 11555,
    lastVisitedAt: '00:00',
    user: {
      id: 46356,
      avatar: 'https://klike.net/uploads/posts/2019-07/medium/1564314090_3.jpg',
      name: 'Ксюша',
      phone: '89312403928',
      status: 'в отпуске',
    },
    unread: 0,
    messages: [
      {
        messageId: 1455,
        editedAt: '00:00',
        sentAt: '00:00',
        type: 'doc',
        text: 'тестовое сообщение',
      },
    ],
  },
  {
    chatId: 54,
    lastVisitedAt: '00:00',
    user: {
      id: 6345,
      avatar: 'https://klike.net/uploads/posts/2019-07/medium/1564314090_3.jpg',
      name: 'Глеб',
      phone: '89312403928',
      status: 'в отпуске',
    },
    unread: 7,
    messages: [
      {
        messageId: 3123,
        editedAt: '00:00',
        sentAt: '00:00',
        type: 'text',
        text: `Привет! Смотри, тут всплыл интересный кусок лунной космической истории — НАСА в какой-то момент попросила Хассельблад адаптировать модель SWC для полетов на Луну. Сейчас мы все знаем что астронавты летали с моделью 500 EL — и к слову говоря, все тушки этих камер все еще находятся на поверхности Луны, так как астронавты с собой забрали только кассеты с пленкой.

        Хассельблад в итоге адаптировал SWC для космоса, но что-то пошло не так и на ракету они так никогда и не попали. Всего их было произведено 25 штук, одну из них недавно продали на аукционе за 45000 евро.`,
      },
    ],
  },
  {
    chatId: 90,
    lastVisitedAt: '00:00',
    user: {
      id: 144,
      avatar: 'https://klike.net/uploads/posts/2019-07/medium/1564314090_3.jpg',
      name: 'Дима',
      phone: '89312403928',
      status: 'в отпуске',
    },
    unread: 0,
    messages: [
      {
        messageId: 2333,
        editedAt: '00:00',
        sentAt: '00:00',
        type: 'audio',
        text: 'тестовое сообщение',
      },
    ],
  },
  {
    chatId: 232,
    lastVisitedAt: '00:00',
    user: {
      id: 13254,
      avatar: 'https://klike.net/uploads/posts/2019-07/medium/1564314090_3.jpg',
      name: 'Аня',
      phone: '89312403928',
      status: 'в отпуске',
    },
    unread: 0,
    messages: [
      {
        messageId: 12,
        editedAt: '00:00',
        sentAt: '00:00',
        type: 'text',
        text: 'тестовое сообщение',
      },
    ],
  },
  {
    chatId: 6345,
    lastVisitedAt: '00:00',
    user: {
      id: 444,
      avatar: 'https://klike.net/uploads/posts/2019-07/medium/1564314090_3.jpg',
      name: 'Женя',
      phone: '89312403928',
      status: 'в отпуске',
    },
    unread: 10,
    messages: [
      {
        messageId: 13423,
        editedAt: '00:00',
        sentAt: '00:00',
        type: 'text',
        text: 'тестовое сообщение',
      },
    ],
  },
  {
    chatId: 11,
    lastVisitedAt: '00:00',
    user: {
      id: 34,
      avatar: 'https://klike.net/uploads/posts/2019-07/medium/1564314090_3.jpg',
      name: 'Ваня',
      phone: '89312403928',
      status: 'в отпуске',
    },
    unread: 4,
    messages: [
      {
        messageId: 1223,
        editedAt: '00:00',
        sentAt: '00:00',
        type: 'text',
        text: 'тестовое сообщение',
      },
    ],
  },
  {
    chatId: 5,
    lastVisitedAt: '00:00',
    user: {
      id: 5,
      avatar: 'https://klike.net/uploads/posts/2019-07/medium/1564314090_3.jpg',
      name: 'Миша',
      phone: '89312403928',
      status: 'в отпуске',
    },
    unread: 2,
    messages: [
      {
        messageId: 1234,
        editedAt: '00:00',
        sentAt: '00:00',
        type: 'text',
        text: 'тестовое сообщение',
      },
    ],
  },
];
