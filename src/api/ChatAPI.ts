import BaseAPI from './BaseAPI';
import {
  AddOrDeleteChatUsers,
  Chat,
  ChatsQuery,
  CreateChat,
} from './types';

export class ChatAPI extends BaseAPI {
  constructor() {
    super('/chats');
  }

  public createChat(data: CreateChat): Promise<{ id: number }> {
    return this.http.post('', { data });
  }

  public getChatToken(chatId: number): Promise<{ token: string }> {
    return this.http.post(`/token/${chatId.toString()}`);
  }

  public getChats(query?: ChatsQuery): Promise<Chat[]> {
    return this.http.get('?', { data: query });
  }

  public updloadChatAvatar(uploadAvatarData: FormData) {
    return this.http.put('/avatar', { data: uploadAvatarData });
  }

  public getChatsUsers(id: number) {
    return this.http.get(`/${id}/users`);
  }

  public addUsersToChat(addUsersData: AddOrDeleteChatUsers) {
    return this.http.put('/users', { data: addUsersData });
  }

  public deleteUsersFromChat(deleteUsersData: AddOrDeleteChatUsers) {
    return this.http.delete('/users', { data: deleteUsersData });
  }

  public deleteChat(chatId: number) {
    return this.http.delete('', { data: { chatId } });
  }

  public getNewMessagesAmount(chatId: number): Promise<{ unread_count: number }> {
    return this.http.get(`/new/${chatId}`);
  }

  create = undefined;
  update = undefined;
  delete = undefined;
  read = undefined;
}
