import template from './profile-button.hbs';
import { Block } from '@/shared/utils/Block';
// @ts-ignore
import arrow from '../../../../static/arrow.svg';
import Router from '@/shared/utils/Router/Router';

interface ProfileButtonProps {
  to: string,
  events?: {
    click: () => void,
  },
}

export class ProfileButton extends Block<ProfileButtonProps> {
  constructor(props: ProfileButtonProps) {
    super('div', {
      ...props,
      events: {
        click: () => this.navigate(),
      },
    });

    this.element!.classList.add('chats-list__profile');
    this.element!.querySelector('img')!.src = arrow;
  }

  protected navigate() {
    Router.go(this.props.to);
  }

  protected render(): DocumentFragment {
    return this.compile(template, this.props);
  }
}
