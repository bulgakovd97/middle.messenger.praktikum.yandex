import template from './edit-password.hbs';
import { Block } from '@/shared/utils/Block';
import {
  Back,
  Avatar,
  ProfileInputBlock,
  SubmitButton,
} from '../../components';
import { InputValidation } from '@/shared/utils/InputValidation';

export class EditPasswordPage extends Block {
  private _form: HTMLFormElement | null;

  constructor() {
    super('div');

    this.element!.classList.add('centering');

    this._form = this.element!.querySelector('.edit-form');
  }

  init() {
    this.children.back = new Back();
    this.children.avatar = new Avatar({ className: 'edit-password__avatar' });

    this.children.submitButton = new SubmitButton({
      className: 'edit-password__button',
      title: 'Сохранить',
    });

    this.children.oldPasswordInputBlock = new ProfileInputBlock({
      for: 'oldPassword',
      id: 'oldPassword',
      label: 'Старый пароль',
      name: 'oldPassword',
      placeholder: '•••••••',
      type: 'password',
      errorMessage: 'Неверный пароль',
      disabled: false,
      events: {
        focusin: (event) => new InputValidation(event.target as HTMLInputElement).validate(),
        focusout: (event) => new InputValidation(event.target as HTMLInputElement).validate(),
      },
    });

    this.children.newPasswordInputBlock = new ProfileInputBlock({
      for: 'newPassword',
      id: 'newPassword',
      label: 'Новый пароль',
      name: 'newPassword',
      placeholder: '•••••••••••',
      type: 'password',
      errorMessage: 'Неверный пароль',
      disabled: false,
      events: {
        focusin: (event) => new InputValidation(event.target as HTMLInputElement).validate(),
        focusout: (event) => new InputValidation(event.target as HTMLInputElement).validate(),
      },
    });

    this.children.repeatNewPasswordInputBlock = new ProfileInputBlock({
      for: 'newPassword-repeat',
      id: 'newPassword-repeat',
      label: 'Повторите новый пароль',
      name: 'newPassword-repeat',
      placeholder: '•••••••••••',
      type: 'password',
      errorMessage: 'Пароли не совпадают',
      disabled: false,
      events: {
        focusin: (event) => new InputValidation(event.target as HTMLInputElement).validate(),
        focusout: (event) => new InputValidation(event.target as HTMLInputElement).validate(),
      },
    });
  }

  render() {
    return this.compile(template, this.props);
  }

  protected componentDidMount(): void {
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
        const label = input.previousElementSibling as HTMLLabelElement;
        const error = input.parentElement!.nextElementSibling as HTMLParagraphElement;

        if ((index === array.length - 1) && input.value !== passwordValue) {
          error.style.display = 'block';
          input.style.borderBottom = '1px solid #ff2f2f';
          label.style.borderBottom = '1px solid #ff2f2f';
          return;
        }

        error.style.display = 'none';
        input.style.borderBottom = '1px solid #eaeaea';
        label.style.borderBottom = '1px solid #eaeaea';

        validInputs.push(input);
      }
    });

    if (validInputs.length === 3) {
      validInputs.forEach((input) => {
        const { name, value } = input;
        console.log(`${name}:`, value);
      });
    }
  }

  private _setEventListeners() {
    this._form?.addEventListener('submit', this._handleSubmit.bind(this));
  }
}
