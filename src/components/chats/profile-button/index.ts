import template from './profile-button.hbs';
import { Block } from '@/shared/utils/Block';
// @ts-ignore
import arrow from '../../../../static/arrow.svg';

interface ProfileButtonProps {
  events: {
    click: (event: Event) => void,
  },
}

export class ProfileButton extends Block<ProfileButtonProps> {
  constructor(props: ProfileButtonProps) {
    super('div', props);

    this.element!.classList.add('chats-list__profile');
    this.element!.querySelector('img')!.src = arrow;
  }

  protected render(): DocumentFragment {
    return this.compile(template, this.props);
  }
}
