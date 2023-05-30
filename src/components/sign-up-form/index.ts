import { InputBlock } from '../input-block';
import { SubmitButton } from '../submit-button';
import template from './sign-up-form.hbs';
import { Block } from '@/shared/utils/Block';
import { InputValidation } from '@/shared/utils/InputValidation';
import Router from '@/shared/utils/Router';
import { Routes } from '@/shared/lib';
import { SignupData } from '@/api/types';
import authController from '@/controllers/AuthController';
import { store } from '@/shared/utils/Store';

interface SignUpFormProps {
  title: string;
  linkText: string;
}

export class SignUpForm extends Block<SignUpFormProps> {
  private _form: HTMLFormElement | null;
  private _linkButton: HTMLButtonElement | null;

  constructor(props: SignUpFormProps) {
    super('main', props);

    this.element!.classList.add('sign-up-container');

    this._form = this.element!.querySelector('.sign-form');
    this._linkButton = this.element!.querySelector('.sign-form__link-button');
  }

  init() {
    this.children.submitButton = new SubmitButton({
      className: ['sign-form__button', 'sign-form__button_type_sign-up'],
      title: 'Зарегистрироваться',
    });

    this.children.emailInput = new InputBlock({
      for: 'email',
      id: 'email',
      label: 'Почта',
      name: 'email',
      placeholder: 'Почта',
      type: 'email',
      errorClass: 'input-block__error_type_email',
      errorMessage: 'Неверная почта',
      events: {
        focusin: (event) => new InputValidation(event.target as HTMLInputElement).validate(),
        focusout: (event) => new InputValidation(event.target as HTMLInputElement).validate(),
      },
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

    this.children.firstnameInput = new InputBlock({
      for: 'first_name',
      id: 'first_name',
      label: 'Имя',
      name: 'first_name',
      placeholder: 'Имя',
      type: 'text',
      errorClass: 'input-block__error_type_firstname',
      errorMessage: 'Неверное имя',
      events: {
        focusin: (event) => new InputValidation(event.target as HTMLInputElement).validate(),
        focusout: (event) => new InputValidation(event.target as HTMLInputElement).validate(),
      },
    });

    this.children.surnameInput = new InputBlock({
      for: 'second_name',
      id: 'second_name',
      label: 'Фамилия',
      name: 'second_name',
      placeholder: 'Фамилия',
      type: 'text',
      errorClass: 'input-block__error_type_surname',
      errorMessage: 'Неверная фамилия',
      events: {
        focusin: (event) => new InputValidation(event.target as HTMLInputElement).validate(),
        focusout: (event) => new InputValidation(event.target as HTMLInputElement).validate(),
      },
    });

    this.children.phoneInput = new InputBlock({
      for: 'phone',
      id: 'phone',
      label: 'Телефон',
      name: 'phone',
      placeholder: 'Телефон',
      type: 'tel',
      errorClass: 'input-block__error_type_phone',
      errorMessage: 'Неверный номер телефона',
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

    this.children.repeatPasswordInput = new InputBlock({
      for: 'password-repeat',
      id: 'password-repeat',
      label: 'Пароль (ещё раз)',
      name: 'password-repeat',
      placeholder: 'Пароль (ещё раз)',
      type: 'password',
      errorClass: 'input-block__error_type_password-repeat',
      errorMessage: 'Пароли не совпадают',
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

    if (inputValues.length !== 7) return;

    const signupData: SignupData & { 'password-repeat': string } = Object.fromEntries(inputValues);

    const repeatPasswordInput = (this.children.repeatPasswordInput as InputBlock).element!.querySelector('input') as HTMLInputElement;
    const error = this.element!.querySelector('.sign-up__error') as HTMLParagraphElement;

    if (signupData.password !== signupData['password-repeat']) {
      error.style.display = 'block';
      repeatPasswordInput.style.borderBottomColor = '#ff2f2f';
      return;
    } else {
      error.style.display = 'none';
      repeatPasswordInput.style.borderBottomColor = '#0ec2c2';
    }

    await authController.signup(signupData);

    const { hasError } = store.getState().user;

    if (hasError) {
      this.element!.querySelector('.sign-up__error')?.classList.add('visible-block');
    }
  }

  private _setEventListeners() {
    // eslint-disable-next-line @typescript-eslint/no-misused-promises
    this._form!.addEventListener('submit', this._handleSubmit.bind(this));
    this._linkButton!.addEventListener('click', () => {
      Router.go(Routes.LOGIN);
    });
  }

  render() {
    return this.compile(template, this.props);
  }
}
