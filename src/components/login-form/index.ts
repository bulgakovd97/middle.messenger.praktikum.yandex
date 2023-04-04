import {
  loginMaxLength,
  loginMinLength,
  loginRegex,
  passwordMaxLength,
  passwordMinLength,
  passwordRegex,
} from '@/shared/lib';
import { InputBlock } from '../input-block';
import { SubmitButton } from '../submit-button';
import template from './login-form.hbs';
import { Block } from '@/shared/utils/Block';
import { CheckDataProps, InputValidation } from '@/shared/utils/FormValidation';

interface LoginFormProps {
  title: string;
  linkText: string;
}

export class LoginForm extends Block<LoginFormProps> {
  private _form: HTMLFormElement | null;

  constructor(props: LoginFormProps) {
    super('main', props);

    this.element!.classList.add('login-container');

    this._form = this.element!.querySelector('.sign-form');
  }

  init() {
    this.children.submitButton = new SubmitButton({
      className: ['sign-form__button', 'sign-form__button_type_login'],
      title: 'Войти',
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
        focusin: (event) => new InputValidation({
          input: event.target as HTMLInputElement,
          checkData: {
            regex: loginRegex,
            minLength: loginMinLength,
            maxLength: loginMaxLength,
          },
        }).validate(),
        focusout: (event) => new InputValidation({
          input: event.target as HTMLInputElement,
          checkData: {
            regex: loginRegex,
            minLength: loginMinLength,
            maxLength: loginMaxLength,
          },
        }).validate(),
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
        focusin: (event) => new InputValidation({
          input: event.target as HTMLInputElement,
          checkData: {
            regex: passwordRegex,
            minLength: passwordMinLength,
            maxLength: passwordMaxLength,
          },
        }).validate(),
        focusout: (event) => new InputValidation({
          input: event.target as HTMLInputElement,
          checkData: {
            regex: passwordRegex,
            minLength: passwordMinLength,
            maxLength: passwordMaxLength,
          },
        }).validate(),
      },
    });
  }

  componentDidMount() {
    this._setEventListeners();
  }

  private _handleSubmit(event: Event) {
    event.preventDefault();
    const form = event.target as HTMLFormElement;

    const validInputs: HTMLInputElement[] = [];

    form.querySelectorAll('input').forEach((input) => {
      const { name } = input;

      let checkData: CheckDataProps;

      if (name === 'login') {
        checkData = {
          regex: loginRegex,
          minLength: loginMinLength,
          maxLength: loginMaxLength,
        };
      } else {
        checkData = {
          regex: passwordRegex,
          minLength: passwordMinLength,
          maxLength: passwordMaxLength,
        };
      }

      const isValid = new InputValidation({ input, checkData }).validate();

      if (isValid) {
        validInputs.push(input);
      }
    });

    if (validInputs.length === 2) {
      validInputs.forEach((input) => {
        const { name, value } = input;
        console.log(`${name}:`, value);
      });
    }
  }

  private _setEventListeners() {
    this._form!.addEventListener('submit', this._handleSubmit.bind(this));
  }

  render() {
    return this.compile(template, this.props);
  }
}
