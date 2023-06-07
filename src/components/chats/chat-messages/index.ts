import template from './chat-messages.hbs';
import { Block } from '@/shared/utils/Block';
import { MessageResponse } from '@/api/types';
import { ChatMessage } from '../chat-message';

interface ChatMessagesProps {
  messages: MessageResponse[];
  userId?: number | null;
  visible?: string;
  events?: {
    scroll: (event: UIEvent) => void,
  },
}

export class ChatMessages extends Block<ChatMessagesProps> {
  constructor(props: ChatMessagesProps) {
    super('div', props);

    this.element!.classList.add('feed__messages-block');

    if (this.props.visible) {
      this.element!.classList.add(this.props.visible);
    }
  }

  protected init(): void {
    this.children.chatMessages = this.props.messages.map((message) => {
      return new ChatMessage({
        content: message.content,
        time: message.time,
        userId: message.user_id.toString(),
        chatId: message.chat_id.toString(),
      });
    });
  }

  render() {
    return this.compile(template, this.props);
  }
}
