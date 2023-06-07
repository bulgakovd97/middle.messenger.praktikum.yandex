import template from './chat-avatar.hbs';
import { Block } from '@/shared/utils/Block';
import { withStore } from '@/shared/utils/Store';

interface ChatAvatarProps {
  chatAvatar: string;
  type: string;
  events?: {
    click: (event: Event) => void,
  },
}

export class ChatAvatarComponent extends Block<ChatAvatarProps> {
  constructor(props: ChatAvatarProps) {
    super('div', props);

    this.element!.classList.add(`${this.props.type}__avatar-container`);
  }

  render() {
    return this.compile(template, this.props);
  }
}

const withChat = withStore((state) => ({ ...state.chat }));

export const ChatAvatar = withChat(ChatAvatarComponent as unknown as typeof Block);
