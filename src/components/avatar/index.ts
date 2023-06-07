import template from './avatar.hbs';
import { Block } from '@/shared/utils/Block';
// @ts-ignore
import avatar from '../../../static/avatar.svg';
import { withStore } from '@/shared/utils/Store';

interface AvatarProps {
  className: string;
  events?: {
    click: (event: Event) => void,
  };
  photo?: string;
}

export class AvatarComponent extends Block<AvatarProps> {
  constructor(props: AvatarProps) {
    super('div', props);

    this.element?.classList.add('avatar');
    this.element?.classList.add(props.className);
    (this.element!.querySelector('.avatar__button') as HTMLButtonElement).style.backgroundImage = avatar;
  }

  render() {
    return this.compile(template, this.props);
  }
}

const withUser = withStore((state) => ({ ...state.user }));

export const Avatar = withUser(AvatarComponent as unknown as typeof Block);
