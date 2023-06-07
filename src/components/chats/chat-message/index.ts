import { store } from '@/shared/utils/Store';
import template from './chat-message.hbs';
import { Block } from '@/shared/utils/Block';

interface ChatMessageProps {
  content: string;
  time: string;
  userId: string;
  chatId: string;
}

export class ChatMessage extends Block<ChatMessageProps> {
  constructor(props: ChatMessageProps) {
    super('div', props);

    this.element!.classList.add('feed__message');
  }

  protected init(): void {
    this.element!.setAttribute('data-user', this.props.userId.toString());
    this.element!.setAttribute('data-chat', this.props.chatId.toString());

    const isCurrentUser = this.element!.dataset.user === store.getState().user.data?.id.toString();

    if (isCurrentUser) {
      this.element!.classList.add('feed__message_left');
    } else {
      this.element!.classList.add('feed__message_right');
    }
  }

  protected render(): DocumentFragment {
    return this.compile(template, this.props);
  }
}
