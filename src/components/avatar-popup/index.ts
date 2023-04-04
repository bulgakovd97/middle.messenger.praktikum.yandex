import { SubmitButton } from '../submit-button';
import template from './avatar-popup.hbs';
import { Block } from '../../shared/utils/Block';

interface AvatarPopupProps {
  title: string;
  errorClass?: string;
  fileName?: string;
  fileNameError?: string;
  photoSrc?: string;
  events?: {
    change: (event: Event) => void,
  };
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
      title: 'Поменять',
      events: {
        click: (event) => this._changeAvatar(event),
      },
    });
  }

  private _changeAvatar(event: Event) {
    event.preventDefault();

    const noFileError = this.element!.querySelector('.avatar-popup-form__error') as HTMLParagraphElement;

    if (this.props.photoSrc) {
      const avatar = document.querySelector('.avatar__photo') as HTMLImageElement;
      avatar.src = this.props.photoSrc;
      this.element!.classList.remove('popup_opened');
      noFileError?.classList.remove('visible-block');

      avatar.onload = () => {
        window.URL.revokeObjectURL(avatar.src);
      };

      setTimeout(() => {
        this.setProps({
          title: 'Загрузите файл',
          fileName: '',
          fileNameError: '',
          photoSrc: '',
          errorClass: '',
        });
      }, 500);
    } else {
      noFileError?.classList.add('visible-block');
    }
  }

  render() {
    return this.compile(template, this.props);
  }
}
