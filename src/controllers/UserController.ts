import { UserAPI } from '@/api/UserAPI';
import { store } from '@/shared/utils/Store';

class UserController {
  private api: UserAPI;

  constructor() {
    this.api = new UserAPI();
  }

  async updateProfile(data: Record<string, unknown>) {
    return this.api.updateProfile(data)
      .then((user) => {
        store.set('user.data', user);
      })
      .catch(console.log);
  }

  async updateAvatar(avatar: FormData) {
    return this.api.updateAvatar(avatar)
      .then((user) => {
        store.set('user.data', user);
      })
      .catch((error) => {
        console.log(error);
        store.set('user.hasError', true);
      });
  }

  async changePassword(data: Record<string, string>) {
    return this.api.editPassword(data);
  }

  async findUserByLogin(login: string) {
    return this.api.findUserByLogin(login);
  }
}

export default new UserController();
