import template from './sign-up.hbs';
import { Block } from '../../shared/utils/Block';
import { SignUpForm } from '../../components/sign-up-form';

export class SignUpPage extends Block {
  constructor() {
    super('div');

    this.element!.classList.add('centering');
  }

  init() {
    this.children.signUpForm = new SignUpForm({
      title: 'Регистрация',
      linkText: 'Войти',
    });
  }

  render() {
    return this.compile(template, this.props);
  }
}
