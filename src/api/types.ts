export type SignupData = {
  first_name: string;
  second_name: string;
  login: string;
  email: string;
  password: string;
  phone: string;
};

export type LoginData = {
  login: string;
  password: string;
};

export type User = {
  id: number;
  first_name: string;
  second_name: string;
  display_name: string;
  login: string;
  email: string;
  phone: string;
  avatar: string;
};

export type Message = {
  user: {
    first_name: string,
    second_name: string,
    avatar: string,
    email: string,
    login: string,
    phone: string,
  },
  time: string,
  content: string,
};

export type CreateChat = {
  title: string;
};

export type Chat = {
  id: number,
  title: string,
  avatar: string | null,
  unread_count: number,
  last_message: Message | null,
  created_by: number,
};

export type ChatsQuery = {
  offset?: number;
  limit?: number;
  title?: string;
};

export type MessageResponse = {
  chat_id: number,
  id: number,
  is_read: boolean,
  time: string,
  type: string,
  user_id: string,
  content: string,
  file?: {
    id: number,
    user_id: number,
    path: string,
    filename: string,
    content_type: string,
    content_size: number,
    upload_date: string,
  } | null,
};

export type AddOrDeleteChatUsers = {
  users: number[];
  chatId: number;
};
