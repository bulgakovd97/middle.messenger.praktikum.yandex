import {
  AttachmentDropDown,
  ChatItem,
  ChatList,
  Feed,
  UserDropDown,
} from '@/components/chats';
import template from './chats.hbs';
import { Block } from '@/shared/utils/Block';
import { UserPopup } from '@/components/user-popup';
import { InputValidation } from '@/shared/utils/InputValidation';
import { mockChats } from '@/shared/data';

export class ChatsPage extends Block {
  private _userDropDown: HTMLDivElement | null;
  private _userPopup: UserPopup | null;
  private _loginInput: HTMLInputElement | null;
  private _userSubmitButton: HTMLFormElement | null;

  static CLASSNAMES = {
    FEED_ATTACHMENT_BUTTON: 'feed__attachment-button',
    FEED_ACTION_BUTTON: 'feed__action-button',
    FEED_SEND_BUTTON: 'feed__send-button',
    FEED_MESSAGE_INPUT: 'feed__message-input',
  } as const;

  constructor() {
    super('main');

    this.element!.classList.add('chats');

    this._userDropDown = this.element!.querySelector('.dropdown-action');
    this._userPopup = this.children.userPopup as UserPopup;
    this._loginInput = this._userPopup.element!.querySelector('input');
    this._userSubmitButton = this.element!.querySelector('.user-popup-form__button');
  }

  init() {
    this.children.feed = new Feed({
      events: {
        click: (event) => this._handleFeedClick(event),
        change: (event) => this._handleMessageInputChange(event),
      },
    });

    this.children.userPopup = new UserPopup({ title: 'Добавить' });

    this.children.chatList = new ChatList();

    const chats = this.children.chatList.children.chats as ChatItem[];

    this._chooseChatItem(chats);
  }

  componentDidMount() {
    this._setEventListeners();
  }

  private _chooseChatItem(chatItems: ChatItem[]): void {
    chatItems.forEach((chatItem) => chatItem.element!.addEventListener('click', (event) => {
      const chat = event.currentTarget as HTMLLIElement;

      const currentChat = mockChats.find((mockChat) => chat.dataset.id === mockChat.chatId.toString());

      if (!currentChat) return;

      const { messages, user } = currentChat;

      const lastMessage = messages[messages.length - 1];

      const feed = this.children.feed as Feed;

      feed.setProps({
        userName: user.name,
        userAvatar: user.avatar,
        date: lastMessage.editedAt,
        sentAt: lastMessage.sentAt,
        messageText: lastMessage.text,
        feedTextClass: 'invisible',
        visible: 'visible-flex',
      });
    }));
  }

  private _handleMessageInputChange(event: Event) {
    const messageInput = event.target as HTMLInputElement;
    const { name, value } = messageInput;

    if (value) {
      console.log(`${name}: ${value}`);
      messageInput.value = '';
    }
  }

  private _handleFeedClick(event: Event) {
    const targetElement = event.target as HTMLElement;

    const {
      FEED_ACTION_BUTTON,
      FEED_ATTACHMENT_BUTTON,
      FEED_MESSAGE_INPUT,
      FEED_SEND_BUTTON,
    } = ChatsPage.CLASSNAMES;

    const feed = this.children.feed as Feed;

    switch (targetElement.className) {
      case FEED_ATTACHMENT_BUTTON:
        (feed.children.attachmentDropDown as AttachmentDropDown).element!.classList.toggle('dropdown_opened');
        break;

      case FEED_ACTION_BUTTON:
        (feed.children.userDropDown as UserDropDown).element!.classList.toggle('dropdown_opened');
        break;

      case FEED_SEND_BUTTON:
        const messageInput = feed.element!.querySelector(`.${FEED_MESSAGE_INPUT}`) as HTMLInputElement;
        const { name, value } = messageInput;

        if (value) {
          console.log(`${name}: ${value}`);
          messageInput.value = '';
        }

        break;

      default:
        break;
    }
  }

  private _openPopup(event: Event) {
    this._userPopup!.element?.classList.add('popup_opened');

    const target = (event.target as HTMLDivElement);

    if (target.classList.contains('dropdown__button_type_add') || target.textContent?.includes('Добавить')) {
      this._userPopup!.setProps({ title: 'Добавить', buttonText: 'Добавить' });
    }

    if (target.classList.contains('dropdown__button_type_remove') || target.textContent?.includes('Удалить')) {
      this._userPopup!.setProps({ title: 'Удалить', buttonText: 'Удалить' });
    }
  }

  private _closePopup() {
    this._userPopup!.element?.classList.remove('popup_opened');
    this._userDropDown!.classList.remove('dropdown_opened');
    this._loginInput!.value = '';
    this._loginInput!.style.borderBottomColor = '#0ec2c2';
    (this._userPopup!.element!.querySelector('.input-block__error') as HTMLParagraphElement)!.style.display = 'none';
  }

  private _handleSubmit(event: Event) {
    event.preventDefault();

    const button = event.target as HTMLButtonElement;

    const input = button.previousElementSibling!.querySelector('input')!;

    const isValid = new InputValidation(input).validate();

    if (isValid) {
      const { name, value } = input;
      console.log(`${name}:`, value);

      this._closePopup();
    }
  }

  private _setEventListeners() {
    this._userSubmitButton!.addEventListener('click', this._handleSubmit.bind(this));

    this._userDropDown!.addEventListener('click', this._openPopup.bind(this));

    this._userPopup!.element?.addEventListener('click', (event) => {
      if ((event.target as HTMLDivElement).classList.contains('popup_opened')) {
        this._closePopup();
      }
    });

    this.element!.addEventListener('keyup', (event) => {
      if (event.key === 'Escape') {
        this._userDropDown!.classList.remove('dropdown_opened');
      }
    });
  }

  render() {
    return this.compile(template, this.props);
  }
}
