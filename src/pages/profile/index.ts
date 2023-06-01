import template from './profile.hbs';
import { Block } from '@/shared/utils/Block';
import {
  Back,
  Avatar,
  ButtonGroup,
  SubmitButton,
  AvatarPopup,
  ProfileInputBlock,
} from '../../components';
import { InputValidation } from '@/shared/utils/InputValidation';
import { store, withStore } from '@/shared/utils/Store';
import router from '@/shared/utils/Router';
import { User } from '@/api/types';
import userController from '@/controllers/UserController';

class ProfilePageBase extends Block {
  private _editButton: HTMLButtonElement | null = null;
  private _inputClass: string;
  private _avatarPopup: HTMLDivElement | null;

  constructor() {
    super('div');

    this.element!.classList.add('centering');
    this._inputClass = '.profile-input-block__input';
    this._avatarPopup = this.element!.querySelector('.avatar-popup');
  }

  init() {
    const { data } = store.getState().user;

    this.children.back = new Back({ events: { click: () => router.back() } });

    this.children.avatarPopup = new AvatarPopup({
      title: 'Загрузите файл',
      events: {
        change: (event: Event) => this._chooseAvatar(event),
      },
    });

    this.children.avatar = new Avatar({
      className: 'profile__avatar',
      events: {
        click: () => {
          this._avatarPopup?.classList.add('popup_opened');
        },
      },
    });

    this.children.buttonGroup = new ButtonGroup({
      className: ['profile__button-group', 'edit-form__button-group'],
    });

    this.children.emailInputBlock = new ProfileInputBlock({
      for: 'email',
      id: 'email',
      label: 'Почта',
      name: 'email',
      type: 'email',
      value: data?.email,
      errorMessage: 'Неверная почта',
      disabled: true,
      events: {
        focusin: (event: Event) => new InputValidation(event.target as HTMLInputElement).validate(),
        focusout: (event: Event) => new InputValidation(event.target as HTMLInputElement).validate(),
      },
    });

    this.children.loginInputBlock = new ProfileInputBlock({
      for: 'login',
      id: 'login',
      label: 'Логин',
      name: 'login',
      type: 'text',
      value: data?.login,
      errorMessage: 'Неверный логин',
      disabled: true,
      events: {
        focusin: (event: Event) => new InputValidation(event.target as HTMLInputElement).validate(),
        focusout: (event: Event) => new InputValidation(event.target as HTMLInputElement).validate(),
      },
    });

    this.children.firstnameInputBlock = new ProfileInputBlock({
      for: 'first_name',
      id: 'first_name',
      label: 'Имя',
      name: 'first_name',
      type: 'text',
      value: data?.first_name,
      errorMessage: 'Неверное имя',
      disabled: true,
      events: {
        focusin: (event: Event) => new InputValidation(event.target as HTMLInputElement).validate(),
        focusout: (event: Event) => new InputValidation(event.target as HTMLInputElement).validate(),
      },
    });

    this.children.surnameInputBlock = new ProfileInputBlock({
      for: 'second_name',
      id: 'second_name',
      label: 'Фамилия',
      name: 'second_name',
      type: 'text',
      value: data?.second_name,
      errorMessage: 'Неверная фамилия',
      disabled: true,
      events: {
        focusin: (event: Event) => new InputValidation(event.target as HTMLInputElement).validate(),
        focusout: (event: Event) => new InputValidation(event.target as HTMLInputElement).validate(),
      },
    });

    this.children.pseudonymInputBlock = new ProfileInputBlock({
      for: 'display_name',
      id: 'display_name',
      label: 'Имя в чате',
      name: 'display_name',
      type: 'text',
      value: data?.display_name,
      errorMessage: 'Неверное имя',
      disabled: true,
      events: {
        focusin: (event: Event) => new InputValidation(event.target as HTMLInputElement).validate(),
        focusout: (event: Event) => new InputValidation(event.target as HTMLInputElement).validate(),
      },
    });

    this.children.phoneInputBlock = new ProfileInputBlock({
      for: 'phone',
      id: 'phone',
      label: 'Телефон',
      name: 'phone',
      type: 'tel',
      value: data?.phone,
      errorMessage: 'Неверный номер телефона',
      disabled: true,
      events: {
        focusin: (event: Event) => new InputValidation(event.target as HTMLInputElement).validate(),
        focusout: (event: Event) => new InputValidation(event.target as HTMLInputElement).validate(),
      },
    });

    this.children.submitButton = new SubmitButton({
      className: 'profile__submit-button',
      buttonText: 'Сохранить',
      events: {
        // eslint-disable-next-line @typescript-eslint/no-misused-promises
        click: (event) => this._handleSubmit(event),
      },
    });

    this.children.submitButton.element!.style.display = 'none';

    this._editButton = (this.children.buttonGroup as ButtonGroup).editButton;

    this._editButton.addEventListener('click', this._handleEditClick.bind(this));
  }

  private _chooseAvatar(event: Event) {
    const input = event.target as HTMLInputElement;

    if (!input) return;

    const file = input.files?.[0];

    if (file && (file.type === 'image/png' || file.type === 'image/jpeg')) {
      (this.children.avatarPopup as AvatarPopup).setProps({
        title: 'Файл загружен',
        fileName: file.name,
        fileNameError: 'visible-block',
        file,
      });

      this.element!.querySelector('h1')?.classList.remove('avatar-popup__title_error');
      this.element!.querySelector('.avatar-popup-form__error')?.classList.remove('visible-block');
    } else {
      (this.children.avatarPopup as AvatarPopup).setProps({
        title: 'Ошибка, попробуйте ещё раз',
        errorClass: 'avatar-popup__title_error',
        fileNameError: '',
        file: undefined,
      });
    }
  }

  render() {
    return this.compile(template, this.props);
  }

  private _setEventListeners() {
    this._avatarPopup?.addEventListener('click', (event) => {
      if ((event.target as HTMLDivElement).classList.contains('popup_opened')) {
        this._closePopup();
      }
    });

    this.element?.addEventListener('keyup', (event) => {
      if (event.key === 'Escape') {
        this._closePopup();
      }
    });
  }

  protected componentDidMount() {
    this._setEventListeners();
  }

  private _handleEditClick() {
    (this.children.buttonGroup as ButtonGroup).element!.style.display = 'none';
    (this.children.submitButton as SubmitButton).element!.style.display = 'block';
    this.element!.querySelectorAll(this._inputClass).forEach((input) => (input as HTMLInputElement).removeAttribute('disabled'));
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

    if (inputValues.length !== 6) return;

    const userData: User = Object.fromEntries(inputValues);

    (this.children.submitButton as SubmitButton).element!.style.display = 'none';
    (this.element!.querySelector('.profile__button-group') as HTMLDivElement).style.display = 'flex';
    (this.element!.querySelectorAll('input')).forEach((input) => {
      input.setAttribute('disabled', '');
      input.value = '';
    });

    const inputValuesObj: Record<string, string> = Object.fromEntries(inputValues);

    const profileInputBlocks = Object.values(this.children).filter((child) => child instanceof ProfileInputBlock);

    profileInputBlocks.forEach((item) => {
      const input = (item as ProfileInputBlock).element!.querySelector('input')!;
      const { name } = input;
      (item as ProfileInputBlock).setProps({ value: inputValuesObj[name] });
    });

    await userController.updateProfile(userData);
  }

  private _closePopup() {
    this._avatarPopup?.classList.remove('popup_opened');

    setTimeout(() => {
      (this.children.avatarPopup as AvatarPopup).setProps({
        errorClass: '',
        fileName: '',
        fileNameError: '',
        file: undefined,
        title: 'Загрузите файл',
      });
    }, 500);
  }
}

const withUser = withStore((state) => ({ ...state.user }));

export const ProfilePage = withUser(ProfilePageBase);
