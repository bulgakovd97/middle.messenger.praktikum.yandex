import template from './chats-list.hbs';
import { Block } from '../../../shared/utils/Block';
// @ts-ignore
import arrow from '../../../../static/arrow.svg';
import { Search } from '../search';
import { chatItems } from '../chat-item';

export class ChatList extends Block {
  private _arrow: HTMLImageElement | null;

  constructor() {
    super('nav');

    this.element!.classList.add('chats-list-container');
    this._arrow = this.element!.querySelector('.chats-list__arrow') as HTMLImageElement;
    this._arrow.src = arrow;
  }

  init() {
    this.children.search = new Search({
      events: {
        keyup: (event) => {
          const input = event.target as HTMLInputElement;
          console.log(input.value);
        },
      },
    });

    this.children.chats = chatItems;
  }

  render() {
    return this.compile(template, this.props);
  }
}
