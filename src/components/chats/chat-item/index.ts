import { MessageType, mockChats } from '@/shared/data';
import template from './chat-item.hbs';
import { Block } from '@/shared/utils/Block';

interface ChatItemProps {
  chatId: number;
  userAvatar: string;
  userName: string;
  messageText: string[];
  sentAt: string[];
  unreadMessagesAmount: number;
  lastVisitedAt: string;
  type: MessageType[];
  events?: {
    click: (event: Event) => void,
  };
}

export class ChatItem extends Block<ChatItemProps, HTMLLIElement> {
  private _unreadAmount: HTMLDivElement | null;

  constructor(props: ChatItemProps) {
    super('li', props);

    this.element!.classList.add('chat-item');
    this._unreadAmount = this.element!.querySelector('.chat-item__unread-amount') as HTMLDivElement;
    if (this.props.unreadMessagesAmount === 0) {
      this._unreadAmount.classList.add('invisible');
    }
  }

  init() {
    this.element!.setAttribute('data-id', this.props.chatId.toString());
  }

  render() {
    return this.compile(template, this.props);
  }
}

export const chatItems = mockChats.map((chat) => {
  const {
    chatId,
    lastVisitedAt,
    messages,
    unread,
    user,
  } = chat;

  const messageText = messages.map((message) => message.text);
  const sentAt = messages.map((message) => message.sentAt);
  const type = messages.map((message) => message.type);

  return new ChatItem({
    chatId,
    lastVisitedAt,
    messageText,
    sentAt,
    type,
    unreadMessagesAmount: unread,
    userAvatar: user.avatar,
    userName: user.name,
  });
});
