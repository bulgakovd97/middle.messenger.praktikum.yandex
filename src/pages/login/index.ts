import { LoginForm } from '../../components';
import template from './login.hbs';
import { Block } from '@/shared/utils/Block';

export class LoginPage extends Block {
  constructor() {
    super('div');

    this.element!.classList.add('centering');
  }

  init() {
    this.children.loginForm = new LoginForm({
      title: 'Вход',
      linkText: 'Нет аккаунта?',
    });
  }

  render() {
    return this.compile(template, this.props);
  }
}
