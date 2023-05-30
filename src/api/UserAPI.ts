import BaseAPI from './BaseAPI';
import { User } from './types';

export class UserAPI extends BaseAPI {
  constructor() {
    super('/user');
  }

  public getUser(id: number): Promise<User> {
    return this.http.get(`/${id}`);
  }

  public updateProfile(data: Record<string, unknown>): Promise<User> {
    return this.http.put('/profile', { data });
  }

  public async updateAvatar(avatar: FormData): Promise<User> {
    return this.http.put('/profile/avatar', { data: avatar });
  }

  public async editPassword(data: Record<string, string>) {
    return this.http.put('/password', { data });
  }

  public async findUserByLogin(login: string): Promise<User[]> {
    return this.http.post('/search', { data: { login } });
  }

  create = undefined;
  update = undefined;
  delete = undefined;
  read = undefined;
}
