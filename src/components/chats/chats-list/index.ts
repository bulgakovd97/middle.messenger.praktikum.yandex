import template from './chats-list.hbs';
import { Block } from '../../../shared/utils/Block';
import { Search } from '../search';
import { ChatItem } from '../chat-item';
import Router from '@/shared/utils/Router/Router';
import { Routes, parseToTime } from '@/shared/lib';
import { Chat } from '@/api/types';
import { ProfileButton } from '../profile-button';
import { NewChatButton } from '../new-chat-button';
import { ChatPopup } from '../chat-popup';
import { store } from '@/shared/utils/Store';
import chatController from '@/controllers/ChatController';

interface ChatListProps {
  chats: Chat[],
  events?: {
    click: (event: Event) => void,
  },
}

export class ChatList extends Block<ChatListProps> {
  constructor(props: ChatListProps) {
    super('nav', props);

    this.element!.classList.add('chats-list-container');
  }

  init() {
    this.children.newChatButton = new NewChatButton({
      events: {
        click: () => this._openChatPopup(),
      },
    });

    this.children.profileButton = new ProfileButton({
      events: {
        click: (event) => {
          event.preventDefault();
          Router.go(Routes.PROFILE);
        },
      },
    });

    this.children.search = new Search({
      events: {
        keyup: (event) => {
          setTimeout(() => {
            // eslint-disable-next-line @typescript-eslint/no-floating-promises
            this._searchChats(event);
          }, 400);
        },
      },
    });

    this.children.chatPopup = new ChatPopup({ title: 'Новый чат' });
  }

  render() {
    return this.compile(template, this.props);
  }

  componentDidMount() {
    this._setEventListeners();
  }

  protected componentDidUpdate(): boolean {
    this.children.chats = this.props.chats
      .map((chat) => new ChatItem({
        avatar: chat.avatar ?? null,
        content: chat.last_message?.content ?? null,
        id: chat.id,
        time: parseToTime(chat.last_message?.time) ?? null,
        title: chat.title,
        unread_count: chat.unread_count,
        user: chat.last_message?.user ?? null,
        events: this.props.events,
      }));

    return true;
  }

  private async _searchChats(event: Event) {
    event.preventDefault();

    const { value } = event.target as HTMLInputElement;

    await chatController.getChats({ title: value });

    const { data } = store.getState().chats;
    this.setProps({ chats: data });

    (this.children.search as Search).element!.querySelector('input')?.focus();
  }

  private _openChatPopup() {
    (this.children.chatPopup as ChatPopup)!.element?.classList.add('popup_opened');
  }

  private _closeChatPopup() {
    (this.children.chatPopup as ChatPopup)!.element!.classList.remove('popup_opened');
    (this.children.chatPopup as ChatPopup)!.element!.querySelector('input')!.value = '';

    const { data } = store.getState().chats;
    this.setProps({ chats: data });
  }

  private _setEventListeners() {
    this.element!.addEventListener('keyup', (event) => {
      if (event.key === 'Escape') {
        (this.children.chatPopup as ChatPopup)!.element!.classList.remove('popup_opened');
      }
    });

    (this.children.chatPopup as ChatPopup)!.element?.addEventListener('click', (event) => {
      if ((event.target as HTMLDivElement).classList.contains('popup_opened')) {
        this._closeChatPopup();
      }
    });
  }
}
