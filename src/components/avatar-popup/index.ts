import { SubmitButton } from '../submit-button';
import template from './avatar-popup.hbs';
import { Block } from '@/shared/utils/Block';
import userController from '@/controllers/UserController';
import { store } from '@/shared/utils/Store';
import router from '@/shared/utils/Router';
import chatController from '@/controllers/ChatController';

interface AvatarPopupProps {
  title: string;
  errorClass?: string;
  fileName?: string;
  fileNameError?: string;
  events?: {
    change: (event: Event) => void,
  };
  file?: File,
}

export class AvatarPopup extends Block<AvatarPopupProps> {
  constructor(props: AvatarPopupProps) {
    super('div', props);

    this.element!.classList.add('popup');
    this.element!.classList.add('avatar-popup');
  }

  init() {
    this.children.submitButton = new SubmitButton({
      className: ['.submit-button', 'avatar-popup-form__button'],
      buttonText: 'Поменять',
      events: {
        // eslint-disable-next-line @typescript-eslint/no-misused-promises
        click: (event) => this._changeAvatar(event),
      },
    });
  }

  private async _changeAvatar(event: Event) {
    event.preventDefault();

    const avatarFile = this.props.file;

    const noFileError = this.element!.querySelector('.avatar-popup-form__error') as HTMLParagraphElement;

    if (avatarFile) {
      const formData = new FormData();
      formData.append('avatar', avatarFile);

      if (router.currentRoutePath === '/profile') {
        await userController.updateAvatar(formData);
      } else {
        const { chat } = store.getState();

        if (chat.data) {
          formData.append('chatId', chat.data.id.toString());

          await chatController.uploadChatAvatar(formData);
        }
      }

      const { hasError } = store.getState().user || store.getState().chat;

      if (hasError) {
        this.setProps({
          title: 'Ошибка, попробуйте ещё раз',
          errorClass: 'avatar-popup__title_error',
          fileName: '',
          fileNameError: '',
          file: undefined,
        });
      } else {
        this.element!.classList.remove('popup_opened');
        noFileError?.classList.remove('visible-block');

        setTimeout(() => {
          this.setProps({
            title: 'Загрузите файл',
            fileName: '',
            fileNameError: '',
            errorClass: '',
            file: undefined,
          });
        }, 500);
      }
    } else {
      noFileError?.classList.add('visible-block');
    }
  }

  render() {
    return this.compile(template, this.props);
  }
}
