import template from './edit-password.hbs';
import { Block } from '@/shared/utils/Block';
import {
  Back,
  Avatar,
  ProfileInputBlock,
  SubmitButton,
} from '@/components/index';
import { InputValidation } from '@/shared/utils/InputValidation';
import Router from '@/shared/utils/Router';
import userController from '@/controllers/UserController';

export class EditPasswordPage extends Block {
  constructor() {
    super('div');

    this.element!.classList.add('centering');
  }

  init() {
    this.children.back = new Back({ events: { click: () => Router.back() } });
    this.children.avatar = new Avatar({ className: 'edit-password__avatar' });

    this.children.submitButton = new SubmitButton({
      className: 'edit-password__button',
      buttonText: 'Сохранить',
      events: {
        // eslint-disable-next-line @typescript-eslint/no-misused-promises
        click: (event) => this._handleSubmit(event),
      },
    });

    this.children.oldPasswordInputBlock = new ProfileInputBlock({
      for: 'oldPassword',
      id: 'oldPassword',
      label: 'Старый пароль',
      name: 'oldPassword',
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

  private async _handleSubmit(event: Event) {
    event.preventDefault();

    const inputValues = Object.values(this.children)
      .filter((child) => {
        if (!(child instanceof ProfileInputBlock)) {
          return;
        }
        const input = child.element!.querySelector('input')!;
        const isValid = new InputValidation(input).validate();
        // eslint-disable-next-line consistent-return
        return isValid;
      })
      .map((child) => {
        const input = (child as ProfileInputBlock).element!.querySelector('input')!;
        const { name, value } = input;
        return [name, value];
      });

    if (inputValues.length !== 3) return;

    const passwordData: Record<string, string> = Object.fromEntries(inputValues);

    const label = (this.children.repeatNewPasswordInputBlock as ProfileInputBlock).element!.querySelector('label') as HTMLLabelElement;
    const repeatNewPasswordInput = (this.children.repeatNewPasswordInputBlock as ProfileInputBlock).element!.querySelector('input') as HTMLInputElement;
    const error = (this.children.repeatNewPasswordInputBlock as ProfileInputBlock).element!.children[1] as HTMLParagraphElement;

    if (passwordData.newPassword !== passwordData['newPassword-repeat']) {
      error.style.display = 'block';
      label.style.borderBottomColor = '#ff2f2f';
      repeatNewPasswordInput.style.borderBottomColor = '#ff2f2f';
      return;
    } else {
      error.style.display = 'none';
      repeatNewPasswordInput.style.borderBottomColor = '#eaeaea';
      label.style.borderBottomColor = '#eaeaea';
    }

    await userController.changePassword({ oldPassword: passwordData.oldPassword, newPassword: passwordData.newPassword });
  }
}
