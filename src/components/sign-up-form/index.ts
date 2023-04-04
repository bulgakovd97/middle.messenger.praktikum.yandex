import { InputBlock } from '../input-block';
import { SubmitButton } from '../submit-button';
import template from './sign-up-form.hbs';
import { Block } from '@/shared/utils/Block';
import { InputValidation } from '@/shared/utils/InputValidation';

interface SignUpFormProps {
  title: string;
  linkText: string;
}

export class SignUpForm extends Block<SignUpFormProps> {
  private _form: HTMLFormElement | null;

  constructor(props: SignUpFormProps) {
    super('main', props);

    this.element!.classList.add('sign-up-container');

    this._form = this.element!.querySelector('.sign-form');
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

  private _handleSubmit(event: Event) {
    event.preventDefault();

    const form = event.target as HTMLFormElement;

    const validInputs: HTMLInputElement[] = [];

    form.querySelectorAll('input').forEach((input, index, array) => {
      const isValid = new InputValidation(input).validate();

      const passwordValue = array[array.length - 2].value;

      if (isValid) {
        const error = input.parentElement!.nextElementSibling as HTMLParagraphElement;

        if ((index === array.length - 1) && input.value !== passwordValue) {
          error.style.display = 'block';
          input.style.borderBottom = '1px solid #ff2f2f';
          return;
        }

        error.style.display = 'none';
        input.style.borderBottom = '1px solid #0ec2c2';

        validInputs.push(input);
      }
    });

    if (validInputs.length === 7) {
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
