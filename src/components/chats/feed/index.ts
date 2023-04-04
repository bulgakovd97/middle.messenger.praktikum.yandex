import template from './feed.hbs';
import { Block } from '@/shared/utils/Block';
import { UserDropDown } from '../user-dropdown';
import { AttachmentDropDown } from '../attachment-dropdown';

interface FeedProps {
  userAvatar?: string;
  userName?: string;
  date?: string;
  messageText?: string;
  sentAt?: string;
  feedTextClass?: string;
  visible?: string;
  events?: {
    click: (event: Event) => void,
    change: (event: Event) => void,
  },
}

export class Feed extends Block<FeedProps, HTMLDivElement> {
  constructor(props: FeedProps) {
    super('div', props);

    this.element!.classList.add('feed');
  }

  init() {
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
}
