import template from './new-chat-button.hbs';
import { Block } from '@/shared/utils/Block';

interface NewChatButtonProps {
  events: {
    click: (event: Event) => void,
  },
}

export class NewChatButton extends Block<NewChatButtonProps> {
  constructor(props: NewChatButtonProps) {
    super('button', props);

    this.element!.classList.add('chat-button');
  }

  protected render(): DocumentFragment {
    return this.compile(template, this.props);
  }
}
