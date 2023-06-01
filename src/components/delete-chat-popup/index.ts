import template from './delete-chat-popup.hbs';
import { Block } from '@/shared/utils/Block';
import { SubmitButton } from '../submit-button';

interface DeleteChatPopupProps {
  title: string;
  buttonText?: string;
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

  render() {
    return this.compile(template, this.props);
  }

  componentDidUpdate() {
    (this.children.submitButton as SubmitButton).setProps({ buttonText: this.props.buttonText });
    return true;
  }
}
