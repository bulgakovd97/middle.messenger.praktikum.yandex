import {
  AttachmentDropDown,
  ChatList,
  Feed,
  FeedComponent,
  UserDropDown,
} from '@/components/chats';
import template from './chats.hbs';
import { Block } from '@/shared/utils/Block';
import { UserPopup } from '@/components/user-popup';
import { InputValidation } from '@/shared/utils/InputValidation';
import chatController from '@/controllers/ChatController';
import { store, withStore } from '@/shared/utils/Store';
import { parseToDate, parseToTime } from '@/shared/lib';
import { Socket } from '@/api/Socket';
import { DeleteChatPopup } from '@/components/delete-chat-popup';

export class Chats extends Block {
  private _userDropDown: HTMLDivElement | null;
  private _userPopup: UserPopup | null;
  private _deleteChatPopup: DeleteChatPopup | null;
  private _loginInput: HTMLInputElement | null;
  private _userSubmitButton: HTMLButtonElement | null;
  private _deleteChatSubmitButton: HTMLButtonElement | null;

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
    this._deleteChatPopup = this.children.deleteChatPopup as DeleteChatPopup;
    this._loginInput = this._userPopup.element!.querySelector('input');
    this._userSubmitButton = this.element!.querySelector('.user-popup-form__button');
    this._deleteChatSubmitButton = this.element!.querySelector('.delete-chat-popup-form__button');
  }

  init() {
    this.children.feed = new Feed({
      events: {
        click: (event: Event) => this._handleFeedClick(event),
        change: (event: Event) => this._handleMessageInputChange(event),
      },
    });

    this.children.userPopup = new UserPopup({ title: 'Добавить' });

    this.children.deleteChatPopup = new DeleteChatPopup({ title: 'Удалить чат?' });

    this.children.chatList = new ChatList({
      chats: [],
      events: {
        // eslint-disable-next-line @typescript-eslint/no-misused-promises
        click: (event) => this._chooseChatItem(event),
      },
    });
  }

  async componentDidMount() {
    this._setEventListeners();

    store.set('messages.data', []);

    const chats = await chatController.getChats();
    (this.children.chatList as ChatList).setProps({ chats: chats ?? [] });
  }

  private async _chooseChatItem(event: Event) {
    event.stopPropagation();

    const chat = event.currentTarget as HTMLLIElement;

    if (!(chat instanceof HTMLLIElement)) return;

    const { chats, user } = store.getState();

    const currentChat = chats.data.find((chatItem) => chat.dataset.id === chatItem.id.toString());

    if (!currentChat) return;

    await chatController.getChat(currentChat.title);

    const {
      avatar,
      title,
      last_message,
      id,
    } = currentChat;

    const time = last_message ? last_message.time : null;

    const { token } = await chatController.getChatToken(Number(currentChat.id));

    const socket = new Socket(Number(user.data?.id), Number(currentChat.id), token);

    store.set('socket', socket);

    socket.connect();

    const feed = this.children.feed as FeedComponent;

    feed.setProps({
      chatName: title,
      chatAvatar: avatar ?? null,
      chatId: id,
      date: parseToDate(time),
      messages: [],
      feedTextClass: 'invisible',
      visible: 'visible-flex',
    });

    setInterval(() => {
      socket.ping();
    }, 30000);

    this._scrollToLastMessage();

    setTimeout(() => {
      socket.getMessages('0');
    }, 500);
  }

  private _handleMessageInputChange(event: Event) {
    const messageInput = event.target as HTMLInputElement;
    const { value } = messageInput;

    const { socket } = store.getState();

    socket?.sendMessage(value);

    store.set('messages.data', []);

    setTimeout(() => {
      socket?.getMessages('0');
    }, 500);

    this._scrollToLastMessage();

    messageInput.value = '';
  }

  private _scrollToLastMessage() {
    setTimeout(() => {
      const messageElements = Array.from(this.element!.querySelectorAll('.feed__message'));

      const lastMessageElement = messageElements[messageElements.length - 1];

      lastMessageElement?.scrollIntoView({ behavior: 'smooth' });
    }, 600);
  }

  private _handleFeedClick(event: Event) {
    const targetElement = event.target as HTMLElement;

    const {
      FEED_ACTION_BUTTON,
      FEED_ATTACHMENT_BUTTON,
    } = Chats.CLASSNAMES;

    const feed = this.children.feed as FeedComponent;

    switch (targetElement.className) {
      case FEED_ATTACHMENT_BUTTON:
        (feed.children.attachmentDropDown as AttachmentDropDown).element!.classList.toggle('dropdown_opened');
        break;

      case FEED_ACTION_BUTTON:
        (feed.children.userDropDown as UserDropDown).element!.classList.toggle('dropdown_opened');
        break;

      default:
        break;
    }
  }

  private _openUserOrDeleteChatPopup(event: Event) {
    const target = (event.target as HTMLDivElement);

    const { data } = store.getState().chat;

    const chatCreatedByUser = data?.created_by;

    if (target.classList.contains('dropdown__button_type_delete-chat') || target.textContent?.includes('чат')) {
      this._deleteChatPopup!.element?.classList.add('popup_opened');

      this._deleteChatPopup!.setProps({ title: 'Удалить чат?', buttonText: 'Удалить', createdBy: chatCreatedByUser });
    } else if (target.classList.contains('dropdown__button_type_add') || target.textContent?.includes('Добавить')) {
      this._userPopup!.element?.classList.add('popup_opened');

      this._userPopup!.setProps({ title: 'Добавить пользователя', buttonText: 'Добавить' });
    } else {
      this._userPopup!.element?.classList.add('popup_opened');

      this._userPopup!.setProps({ title: 'Удалить пользователя', buttonText: 'Удалить' });
    }
  }

  private _closeUserPopup() {
    this._userPopup!.element?.classList.remove('popup_opened');
    this._userDropDown!.classList.remove('dropdown_opened');
    this._loginInput!.value = '';
    this._loginInput!.style.borderBottomColor = '#0ec2c2';
    (this._userPopup!.element!.querySelector('.input-block__error') as HTMLParagraphElement)!.style.display = 'none';
  }

  private _closeDeleteChatPopup() {
    this._deleteChatPopup!.element?.classList.remove('popup_opened');
    this._userDropDown!.classList.remove('dropdown_opened');
  }

  private async _handleUserSubmit(event: Event) {
    event.preventDefault();

    const button = event.target as HTMLButtonElement;

    const input = button.previousElementSibling!.querySelector('input')!;

    const isValid = new InputValidation(input).validate();

    if (!isValid) return;

    const { data } = store.getState().chat;

    const userLogin = input.value;
    const chatId = data?.id;

    if (button.textContent?.includes('Добавить')) {
      await this._addUsersToChat(userLogin, Number(chatId));
    } else {
      await this._deleteUsersFromChat(userLogin, Number(chatId));
    }

    this._closeUserPopup();
  }

  private async _addUsersToChat(login: string, chatId: number) {
    await chatController.addUsersToChat(login, chatId);
  }

  private async _deleteUsersFromChat(login: string, chatId: number) {
    await chatController.deleteUsersFromChat(login, chatId);
  }

  private async _handleDeleteChatSubmit(event: Event) {
    event.preventDefault();

    const { data } = store.getState().chat;

    const chatId = data?.id;

    if (chatId) {
      await chatController.deleteChat(chatId);
    }

    (this.children.feed as FeedComponent).setProps({
      chatAvatar: undefined,
      chatId: undefined,
      chatName: undefined,
      date: undefined,
      feedTextClass: undefined,
      messages: undefined,
      userId: undefined,
      visible: 'invisible',
    });

    this.element!.querySelector('.feed__messages-block')!.classList.remove('visible-flex');

    store.set('chat.data', null);

    this._closeDeleteChatPopup();
  }

  private _setEventListeners() {
    // eslint-disable-next-line @typescript-eslint/no-misused-promises
    this._userSubmitButton!.addEventListener('click', this._handleUserSubmit.bind(this));

    // eslint-disable-next-line @typescript-eslint/no-misused-promises
    this._deleteChatSubmitButton!.addEventListener('click', this._handleDeleteChatSubmit.bind(this));

    this._userDropDown!.addEventListener('click', (event) => {
      this._openUserOrDeleteChatPopup(event);
    });

    this._userPopup!.element?.addEventListener('click', (event) => {
      if ((event.target as HTMLDivElement).classList.contains('popup_opened')) {
        this._closeUserPopup();
      }
    });

    this._deleteChatPopup!.element?.addEventListener('click', (event) => {
      if ((event.target as HTMLDivElement).classList.contains('popup_opened')) {
        this._closeDeleteChatPopup();
      }
    });
  }

  protected componentDidUpdate(): boolean {
    const { messages, chats } = store.getState();

    const date = parseToDate(messages.data[0]?.time);

    const userId = store.getState().user.data?.id;

    const mappedData = messages.data
      .sort((a, b) => (a.time > b.time ? 1 : -1))
      .map((message) => {
        return {
          ...message,
          time: parseToTime(message.time),
        };
      });

    (this.children.feed as FeedComponent).setProps({
      messages: [...mappedData] ?? [],
      date,
      userId,
    });

    (this.children.chatList as ChatList).setProps({ chats: chats.data });

    return true;
  }

  render() {
    return this.compile(template, this.props);
  }
}

const withStorage = withStore((state) => state);

export const ChatsPage = withStorage(Chats);
