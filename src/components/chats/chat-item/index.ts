import template from './chat-item.hbs';
import { Block } from '@/shared/utils/Block';
import { User } from '@/api/types';

interface ChatItemProps {
  id: number;
  title: string;
  avatar: string | null;
  user: Partial<User> | null;
  content: string | null;
  time: string | null;
  unread_count: number;
  events?: {
    click: (event: Event) => void,
  };
}

export class ChatItem extends Block<ChatItemProps> {
  private _unreadCount: HTMLDivElement | null;

  constructor(props: ChatItemProps) {
    super('li', props);

    this.element!.classList.add('chat-item');
    this._unreadCount = this.element!.querySelector('.chat-item__unread-amount') as HTMLDivElement;
    if (this.props.unread_count === 0) {
      this._unreadCount.style.visibility = 'hidden';
    }
  }

  init() {
    this.element!.setAttribute('data-id', this.props.id.toString());
  }

  render() {
    return this.compile(template, this.props);
  }
}
