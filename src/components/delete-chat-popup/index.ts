import template from './delete-chat-popup.hbs';
import { Block } from '@/shared/utils/Block';
import { SubmitButton } from '../submit-button';
import { store } from '@/shared/utils/Store';

interface DeleteChatPopupProps {
  title: string;
  buttonText?: string;
  createdBy?: number;
}

export class DeleteChatPopup extends Block<DeleteChatPopupProps> {
  constructor(props: DeleteChatPopupProps) {
    super('div', props);

    this.element!.classList.add('popup');
    this.element!.classList.add('delete-chat-popup');
  }

  init() {
    this.children.submitButton = new SubmitButton({
      className: ['.submit-button', 'delete-chat-popup-form__button'],
      buttonText: 'Удалить',
    });
  }

  get _submitButton() {
    return this.element!.querySelector('.delete-chat-popup-form__button') as HTMLButtonElement;
  }

  render() {
    if (this.props.createdBy) {
      const { data } = store.getState().user;

      const userId = data?.id;

      if (userId !== this.props.createdBy) {
        this._submitButton.disabled = true;
      }
    }

    return this.compile(template, this.props);
  }

  componentDidUpdate() {
    (this.children.submitButton as SubmitButton).setProps({ buttonText: this.props.buttonText });
    return true;
  }
}
