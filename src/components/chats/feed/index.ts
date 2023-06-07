import template from './feed.hbs';
import { Block } from '../../../shared/utils/Block';
import { UserDropDown } from '../user-dropdown';
import { AttachmentDropDown } from '../attachment-dropdown';
import { MessageResponse } from '@/api/types';
import { store, withStore } from '@/shared/utils/Store';
import { ChatAvatar } from '../chat-avatar';
import { AvatarPopup } from '../../avatar-popup';
import { ChatMessages } from '../chat-messages';
import chatController from '@/controllers/ChatController';

interface FeedProps {
  chatAvatar?: string | null;
  chatName?: string;
  chatId: number | null,
  date?: string | null;
  messages?: MessageResponse[];
  userId?: number | null,
  feedTextClass?: string;
  visible?: string;
  events?: {
    click: (event: Event) => void,
    change: (event: Event) => void,
  },
}

export class FeedComponent extends Block<FeedProps> {
  private _avatarPopup: HTMLDivElement | null;

  constructor(props: FeedProps) {
    super('div', props);

    this.element!.classList.add('feed');
    this._avatarPopup = this.element!.querySelector('.avatar-popup');
  }

  init() {
    this.children.avatarPopup = new AvatarPopup({
      title: 'Загрузите файл',
      events: {
        change: (event: Event) => this._chooseAvatar(event),
      },
    });

    this.children.chatAvatar = new ChatAvatar({
      chatAvatar: this.props.chatAvatar ?? '',
      type: 'feed',
      events: {
        click: () => this._avatarPopup?.classList.add('popup_opened'),
      },
    });

    this.children.userDropDown = new UserDropDown({
      className: 'dropdown-action',
      childrenClass: 'action',
    });

    this.children.attachmentDropDown = new AttachmentDropDown({
      className: 'dropdown-attachment',
      childrenClass: 'attachment',
    });
  }

  render() {
    return this.compile(template, this.props);
  }

  private _chooseAvatar(event: Event) {
    const input = event.target as HTMLInputElement;

    if (!input) return;

    const file = input.files?.[0];

    if (file && (file.type === 'image/png' || file.type === 'image/jpeg')) {
      (this.children.avatarPopup as AvatarPopup).setProps({
        title: 'Файл загружен',
        fileName: file.name,
        fileNameError: 'visible-block',
        file,
      });

      this.element!.querySelector('h1')?.classList.remove('avatar-popup__title_error');
      this.element!.querySelector('.avatar-popup-form__error')?.classList.remove('visible-block');
    } else {
      (this.children.avatarPopup as AvatarPopup).setProps({
        title: 'Ошибка, попробуйте ещё раз',
        errorClass: 'avatar-popup__title_error',
        fileNameError: '',
        file: undefined,
      });
    }
  }

  private _setEventListeners() {
    this._avatarPopup?.addEventListener('click', (event) => {
      if ((event.target as HTMLDivElement).classList.contains('popup_opened')) {
        this._closePopup();
      }
    });
  }

  protected componentDidMount() {
    this._setEventListeners();
  }

  private _closePopup() {
    this._avatarPopup?.classList.remove('popup_opened');

    setTimeout(() => {
      (this.children.avatarPopup as AvatarPopup).setProps({
        errorClass: '',
        fileName: '',
        fileNameError: '',
        file: undefined,
        title: 'Загрузите файл',
      });
    }, 500);
  }

  protected componentDidUpdate(): boolean {
    if (this.props.messages && this.props.messages.length > 0) {
      this.children.chatMessage = new ChatMessages({
        messages: this.props.messages,
        visible: 'visible-flex',
        userId: this.props.userId,
        events: {
          // eslint-disable-next-line @typescript-eslint/no-misused-promises
          scroll: async (event) => {
            const scrollFromTop = (event.target as HTMLDivElement).scrollTop;

            const { socket, chat, messages } = store.getState();

            if (scrollFromTop === 0) {
              const { unread_count } = await chatController.getNewMessagesAmount(Number(chat.data?.id));

              if (messages.data.length !== unread_count) {
                const lastMessage = messages.data[messages.data.length - 1];

                socket?.getMessages(lastMessage.id.toString());
              }
            }
          },
        },
      });
    }
    return true;
  }
}

const withMessages = withStore((state) => (state));

export const Feed = withMessages(FeedComponent as unknown as typeof Block);
