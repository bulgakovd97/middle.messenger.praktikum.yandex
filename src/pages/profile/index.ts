import {
  emailMaxLength,
  emailMinLength,
  emailRegex,
  loginMaxLength,
  loginMinLength,
  loginRegex,
  nameMaxLength,
  nameMinLength,
  nameRegex,
  phoneMaxLength,
  phoneMinLength,
  phoneRegex,
} from '@/shared/lib';
import template from './profile.hbs';
import { Block } from '@/shared/utils/Block';
import {
  Back,
  Avatar,
  ProfileInputBlock,
  ButtonGroup,
  SubmitButton,
  AvatarPopup,
} from '@/components/index';
import { InputValidation, CheckDataProps } from '@/shared/utils/FormValidation';

export class ProfilePage extends Block {
  private _form: HTMLFormElement | null;
  private _editButton: HTMLButtonElement | null = null;
  private _inputClass: string;
  private _avatarPopup: HTMLDivElement | null;

  constructor() {
    super('div');

    this.element!.classList.add('centering');
    this._form = this.element!.querySelector('.edit-form');
    this._inputClass = '.profile-input-block__input';
    this._avatarPopup = this.element!.querySelector('.avatar-popup');
  }

  init() {
    this.children.back = new Back();

    this.children.avatarPopup = new AvatarPopup({
      title: 'Загрузите файл',
      events: {
        change: (event) => this._chooseAvatar(event),
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
      placeholder: 'bulgakovd97@yandex.ru',
      type: 'email',
      disabled: true,
      events: {
        focusin: (event) => new InputValidation({
          input: event.target as HTMLInputElement,
          checkData: {
            regex: emailRegex,
            minLength: emailMinLength,
            maxLength: emailMaxLength,
          },
        }).validate(),
        focusout: (event) => new InputValidation({
          input: event.target as HTMLInputElement,
          checkData: {
            regex: emailRegex,
            minLength: emailMinLength,
            maxLength: emailMaxLength,
          },
        }).validate(),
      },
    });

    this.children.loginInputBlock = new ProfileInputBlock({
      for: 'login',
      id: 'login',
      label: 'Логин',
      name: 'login',
      placeholder: 'bulgakovd',
      type: 'text',
      disabled: true,
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

    this.children.firstnameInputBlock = new ProfileInputBlock({
      for: 'first_name',
      id: 'first_name',
      label: 'Имя',
      name: 'first_name',
      placeholder: 'Денис',
      type: 'text',
      disabled: true,
      events: {
        focusin: (event) => new InputValidation({
          input: event.target as HTMLInputElement,
          checkData: {
            regex: nameRegex,
            minLength: nameMinLength,
            maxLength: nameMaxLength,
          },
        }).validate(),
        focusout: (event) => new InputValidation({
          input: event.target as HTMLInputElement,
          checkData: {
            regex: nameRegex,
            minLength: nameMinLength,
            maxLength: nameMaxLength,
          },
        }).validate(),
      },
    });

    this.children.surnameInputBlock = new ProfileInputBlock({
      for: 'second_name',
      id: 'second_name',
      label: 'Фамилия',
      name: 'second_name',
      placeholder: 'Булгаков',
      type: 'text',
      disabled: true,
      events: {
        focusin: (event) => new InputValidation({
          input: event.target as HTMLInputElement,
          checkData: {
            regex: nameRegex,
            minLength: nameMinLength,
            maxLength: nameMaxLength,
          },
        }).validate(),
        focusout: (event) => new InputValidation({
          input: event.target as HTMLInputElement,
          checkData: {
            regex: nameRegex,
            minLength: nameMinLength,
            maxLength: nameMaxLength,
          },
        }).validate(),
      },
    });

    this.children.pseudonymInputBlock = new ProfileInputBlock({
      for: 'display_name',
      id: 'display_name',
      label: 'Имя в чате',
      name: 'display_name',
      placeholder: 'Денис',
      type: 'text',
      disabled: true,
      events: {
        focusin: (event) => new InputValidation({
          input: event.target as HTMLInputElement,
          checkData: {
            regex: nameRegex,
            minLength: nameMinLength,
            maxLength: nameMaxLength,
          },
        }).validate(),
        focusout: (event) => new InputValidation({
          input: event.target as HTMLInputElement,
          checkData: {
            regex: nameRegex,
            minLength: nameMinLength,
            maxLength: nameMaxLength,
          },
        }).validate(),
      },
    });

    this.children.phoneInputBlock = new ProfileInputBlock({
      for: 'phone',
      id: 'phone',
      label: 'Телефон',
      name: 'phone',
      placeholder: '+79999999999',
      type: 'tel',
      disabled: true,
      events: {
        focusin: (event) => new InputValidation({
          input: event.target as HTMLInputElement,
          checkData: {
            regex: phoneRegex,
            minLength: phoneMinLength,
            maxLength: phoneMaxLength,
          },
        }).validate(),
        focusout: (event) => new InputValidation({
          input: event.target as HTMLInputElement,
          checkData: {
            regex: phoneRegex,
            minLength: phoneMinLength,
            maxLength: phoneMaxLength,
          },
        }).validate(),
      },
    });

    this.children.submitButton = new SubmitButton({
      className: 'profile__submit-button',
      title: 'Сохранить',
    });

    this.children.submitButton.element!.style.display = 'none';

    this._editButton = (this.children.buttonGroup as ButtonGroup).editButton as HTMLButtonElement;

    this._editButton.addEventListener('click', this._handleEditClick.bind(this));
  }

  render() {
    return this.compile(template, this.props);
  }

  private _setEventListeners() {
    this._form!.addEventListener('submit', this._handleSubmit.bind(this));

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

  protected componentDidMount(): void {
    this._setEventListeners();
  }

  private _chooseAvatar(event: Event) {
    const input = event.target as HTMLInputElement;
    const avatarPopup = this.children.avatarPopup as AvatarPopup;

    if (!input) return;

    const file = input.files?.[0];

    if (file && (file.type === 'image/png' || file.type === 'image/jpeg')) {
      avatarPopup.setProps({
        title: 'Файл загружен',
        fileName: file.name,
        fileNameError: 'visible-block',
        photoSrc: window.URL.createObjectURL(file),
      });
      avatarPopup.element!.querySelector('h1')?.classList.remove('avatar-popup__title_error');
      avatarPopup.element!.querySelector('.avatar-popup-form__error')?.classList.remove('visible-block');
    } else {
      avatarPopup.setProps({
        title: 'Ошибка, попробуйте ещё раз',
        errorClass: 'avatar-popup__title_error',
        fileNameError: '',
        photoSrc: '',
      });
    }
  }

  private _handleEditClick() {
    (this.children.buttonGroup as ButtonGroup).element!.style.display = 'none';
    (this.children.submitButton as SubmitButton).element!.style.display = 'block';
    this.element!.querySelectorAll(this._inputClass).forEach((input) => (input as HTMLInputElement).removeAttribute('disabled'));
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
      } else if (name.endsWith('name')) {
        checkData = {
          regex: nameRegex,
          minLength: nameMinLength,
          maxLength: nameMaxLength,
        };
      } else if (name === 'email') {
        checkData = {
          regex: emailRegex,
          minLength: emailMinLength,
          maxLength: emailMaxLength,
        };
      } else {
        checkData = {
          regex: phoneRegex,
          minLength: phoneMinLength,
          maxLength: phoneMaxLength,
        };
      }

      const isValid = new InputValidation({ input, checkData }).validate();

      if (isValid) {
        validInputs.push(input);
      }
    });

    if (validInputs.length === 6) {
      validInputs.forEach((input) => {
        const { name, value } = input;
        console.log(`${name}:`, value);
      });

      (form.querySelector('.submit-button') as HTMLButtonElement).style.display = 'none';
      (form.querySelector('.profile__button-group') as HTMLDivElement).style.display = 'flex';
      validInputs.forEach((input) => {
        input.setAttribute('disabled', '');
        input.value = '';
      });
    }
  }

  private _closePopup() {
    this._avatarPopup?.classList.remove('popup_opened');
  }
}
