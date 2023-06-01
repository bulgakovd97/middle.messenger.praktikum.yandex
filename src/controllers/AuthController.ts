import { AuthAPI } from '@/api/AuthAPI';
import { LoginData, SignupData } from '@/api/types';
import { store } from '@/shared/utils/Store';
import router from '@/shared/utils/Router';
import { Routes } from '@/shared/lib';

class AuthController {
  private api: AuthAPI;

  constructor() {
    this.api = new AuthAPI();
  }

  async signup(data: SignupData) {
    try {
      await this.api.signup(data);

      router.go(Routes.CHATS);
    } catch (error) {
      console.log(error);
      store.set('user.hasError', true);
    }
  }

  async login(data: LoginData) {
    try {
      await this.api.login(data);

      await this.fetchUser();

      router.go(Routes.CHATS);
    } catch (error) {
      store.set('user.hasError', true);
    }
  }

  logout() {
    this.api.logout()
      .then(() => {
        store.set('user.data', null);
        router.go(Routes.LOGIN);
      })
      .catch(console.log);
  }

  async fetchUser() {
    store.set('user.isLoading', true);

    await this.api.getUser()
      .then((user) => {
        store.set('user.data', user);
      })
      .finally(() => store.set('user.isLoading', false));
  }
}

export default new AuthController();
