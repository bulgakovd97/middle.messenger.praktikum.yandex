import { ChatAPI } from '@/api/ChatAPI';
import { ChatsQuery, CreateChat } from '../api';
import { store } from '@/shared/utils/Store';
import { UserAPI } from '@/api/UserAPI';

class ChatController {
  private api: ChatAPI;
  private userApi: UserAPI;

  constructor() {
    this.api = new ChatAPI();
    this.userApi = new UserAPI();
  }

  async createChat(data: CreateChat) {
    try {
      const { id } = await this.api.createChat(data);

      const { token } = await this.getChatToken(id);
      store.set('chats.token', token);

      await this.getChats();
    } catch (error) {
      store.set('chats.hasError', true);
    }
  }

  async getChatToken(chatId: number): Promise<{ token: string }> {
    return this.api.getChatToken(chatId)
      .then((token) => token);
  }

  async getChats(query?: ChatsQuery) {
    return this.api.getChats(query)
      .then((chats) => {
        store.set('chats.data', chats);
        return chats;
      })
      .catch(console.log);
  }

  async uploadChatAvatar(data: FormData) {
    try {
      const chat = await this.api.updloadChatAvatar(data);

      store.set('chat.data', chat);

      await this.getChats();
    } catch {
      store.set('chat.hasError', true);
    }
  }

  async getChatsUsers(chatId: number) {
    try {
      await this.api.getChatsUsers(chatId);
    } catch (error) {
      console.log(error);
    }
  }

  async addUsersToChat(login: string, chatId: number) {
    try {
      const user = await this.userApi.findUserByLogin(login);

      if (!user) return;

      const userId = user.map((u) => u.id);

      await this.api.addUsersToChat({
        users: userId,
        chatId,
      });
    } catch (error) {
      console.log(error);
    }
  }

  async deleteUsersFromChat(login: string, chatId: number) {
    try {
      const user = await this.userApi.findUserByLogin(login);

      if (!user) return;

      const userId = user.map((u) => u.id);

      await this.api.deleteUsersFromChat({
        users: userId,
        chatId,
      });
    } catch (error) {
      console.log(error);
    }
  }

  // eslint-disable-next-line consistent-return
  async getNewMessagesAmount(chatId: number): Promise<{ unread_count: number }> {
    return this.api.getNewMessagesAmount(chatId)
      .then((res) => res);
  }
}

export default new ChatController();
