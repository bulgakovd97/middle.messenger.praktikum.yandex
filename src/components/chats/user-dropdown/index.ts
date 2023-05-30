import template from './user-dropdown.hbs';
import { Block } from '../../../shared/utils/Block';

interface UserDropDownProps {
  className: string;
  childrenClass: string;
  events?: {
    click: (event: Event) => void,
  };
}

export class UserDropDown extends Block<UserDropDownProps, HTMLDivElement> {
  constructor(props: UserDropDownProps) {
    super('div', props);

    this.element!.classList.add('dropdown');
    this.element!.classList.add(props.className);
  }

  render() {
    return this.compile(template, this.props);
  }
}
