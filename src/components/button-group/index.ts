import template from './button-group.hbs';
import { Block } from '@/shared/utils/Block';

interface ButtonGroupProps {
  className: string[];
}

export class ButtonGroup extends Block<ButtonGroupProps, HTMLDivElement> {
  constructor(props: ButtonGroupProps) {
    super('div', props);

    const { className } = props;

    className.forEach((name) => {
      this.element!.classList.add(name);
    });
  }

  get editButton() {
    return this.element!.firstElementChild;
  }

  render() {
    return this.compile(template, this.props);
  }
}
