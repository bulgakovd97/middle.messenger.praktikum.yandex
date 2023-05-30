import template from './attachment-dropdown.hbs';
import { Block } from '../../../shared/utils/Block';

interface AttachmentDropDownProps {
  className: string;
  childrenClass: string;
  events?: {
    click: (event: Event) => void,
  };
}

export class AttachmentDropDown extends Block<AttachmentDropDownProps, HTMLDivElement> {
  constructor(props: AttachmentDropDownProps) {
    super('div', props);

    this.element!.classList.add('dropdown');
    this.element!.classList.add(props.className);
  }

  render() {
    return this.compile(template, this.props);
  }
}
