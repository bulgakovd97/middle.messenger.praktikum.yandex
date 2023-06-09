import { InputBlock } from '../input-block';
import { SubmitButton } from '../submit-button';
import template from './login-form.hbs';
import { Block } from '@/shared/utils/Block';
import { InputValidation } from '@/shared/utils/InputValidation';
import Router from '@/shared/utils/Router/Router';
import { Routes } from '@/shared/lib';
import authController from '@/controllers/AuthController';
import { store } from '@/shared/utils/Store';
import { LoginData } from '@/api/types';

interface LoginFormProps {
  title: string;
  linkText: string;
}

export class LoginForm extends Block<LoginFormProps> {
  private _form: HTMLFormElement | null;
  private _linkButton: HTMLButtonElement | null;

  constructor(props: LoginFormProps) {
    super('main', props);

    this.element!.classList.add('login-container');

    this._form = this.element!.querySelector('.sign-form');

    this._linkButton = this.element!.querySelector('.sign-form__link-button');
  }

  init() {
    this.children.submitButton = new SubmitButton({
      className: ['sign-form__button', 'sign-form__button_type_login'],
      buttonText: 'Войти',
    });

    this.children.loginInput = new InputBlock({
      for: 'login',
      id: 'login',
      label: 'Логин',
      name: 'login',
      placeholder: 'Логин',
      type: 'text',
      errorClass: 'input-block__error_type_login',
      errorMessage: 'Неверный логин',
      events: {
        focusin: (event) => new InputValidation(event.target as HTMLInputElement).validate(),
        focusout: (event) => new InputValidation(event.target as HTMLInputElement).validate(),
      },
    });

    this.children.passwordInput = new InputBlock({
      for: 'password',
      id: 'password',
      label: 'Пароль',
      name: 'password',
      placeholder: 'Пароль',
      type: 'password',
      errorClass: 'input-block__error_type_password',
      errorMessage: 'Неверный пароль',
      events: {
        focusin: (event) => new InputValidation(event.target as HTMLInputElement).validate(),
        focusout: (event) => new InputValidation(event.target as HTMLInputElement).validate(),
      },
    });
  }

  componentDidMount() {
    this._setEventListeners();
  }

  private async _handleSubmit(event: Event) {
    event.preventDefault();

    const inputValues = Object.values(this.children)
      .filter((child) => {
        if (!(child instanceof InputBlock)) {
          return;
        }
        const input = child.element!.querySelector('input')!;
        const isValid = new InputValidation(input).validate();
        // eslint-disable-next-line consistent-return
        return isValid;
      })
      .map((child) => {
        const input = (child as InputBlock).element!.querySelector('input')!;
        const { name, value } = input;
        return [name, value];
      });

    if (inputValues.length !== 2) return;

    const loginData: LoginData = Object.fromEntries(inputValues);

    await authController.login(loginData);

    const { hasError } = store.getState().user;

    if (hasError) {
      this.element!.querySelector('.login__error')?.classList.add('visible-block');
    }
  }

  private _setEventListeners() {
    // eslint-disable-next-line @typescript-eslint/no-misused-promises
    this._form!.addEventListener('submit', this._handleSubmit.bind(this));
    this._linkButton!.addEventListener('click', () => {
      Router.go(Routes.SIGN_UP);
    });
  }

  render() {
    return this.compile(template, this.props);
  }
}
