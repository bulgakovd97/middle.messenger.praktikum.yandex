import template from './avatar.hbs';
import { Block } from '../../shared/utils/Block';
// @ts-ignore
import avatar from '../../../static/avatar.svg';

interface AvatarProps {
  className: string;
  events?: {
    click: (event: Event) => void,
  };
  photo?: string;
}

export class Avatar extends Block<AvatarProps> {
  constructor(props: AvatarProps) {
    super('div', props);

    this.element?.classList.add('avatar');
    this.element?.classList.add(props.className);
    (this.element!.querySelector('.avatar__button') as HTMLButtonElement).style.backgroundImage = avatar;
  }

  render() {
    return this.compile(template, {});
  }
}
