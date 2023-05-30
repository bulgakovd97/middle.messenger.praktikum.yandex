import { SubmitButton } from '../../submit-button';
import template from './chat-popup.hbs';
import { Block } from '@/shared/utils/Block';
import chatController from '@/controllers/ChatController';
import { CreateChat } from '@/api/types';
import { store } from '@/shared/utils/Store';

interface ChatPopupProps {
  title: string;
  errorClass?: string;
  fileName?: string;
  fileNameError?: string;
  events?: {
    change: (event: Event) => void,
  };
  file?: File,
}

export class ChatPopup extends Block<ChatPopupProps> {
  constructor(props: ChatPopupProps) {
    super('div', props);

    this.element!.classList.add('popup');
    this.element!.classList.add('chat-popup');
  }

  init() {
    this.children.submitButton = new SubmitButton({
      className: ['.submit-button', 'chat-popup-form__button'],
      title: 'Создать',
      events: {
        // eslint-disable-next-line @typescript-eslint/no-misused-promises
        click: (event) => this._createChat(event),
      },
    });
  }

  get chatNameInput() {
    return this.element!.querySelector('#chat') as HTMLInputElement;
  }

  render() {
    return this.compile(template, this.props);
  }

  private async _createChat(event: Event) {
    event.preventDefault();

    const createChatData: CreateChat = {
      title: this.chatNameInput.value,
    };

    await chatController.createChat(createChatData);

    const { hasError } = store.getState().chats;

    if (!hasError) {
      this.element!.classList.remove('popup_opened');
      this.chatNameInput.value = '';
    }
  }
}
