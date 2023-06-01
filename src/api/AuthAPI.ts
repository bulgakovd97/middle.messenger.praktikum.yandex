import BaseAPI from './BaseAPI';
import { LoginData, SignupData, User } from './types';

export class AuthAPI extends BaseAPI {
  constructor() {
    super('/auth');
  }

  signup(data: SignupData) {
    return this.http.post('/signup', { data });
  }

  login(data: LoginData) {
    return this.http.post('/signin', { data });
  }

  logout() {
    return this.http.post('/logout');
  }

  getUser() {
    return this.http.get<User>('/user');
  }

  create = undefined;
  read = undefined;
  update = undefined;
  delete = undefined;
}
