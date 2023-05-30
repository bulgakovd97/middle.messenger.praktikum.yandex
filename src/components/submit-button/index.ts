import template from './submit-button.hbs';
import { Block } from '@/shared/utils/Block';

interface SubmitButtonProps {
  className: string | string[];
  title: string;
  events?: {
    click: (event: Event) => void,
  };
}

export class SubmitButton extends Block<SubmitButtonProps, HTMLButtonElement> {
  constructor(props: SubmitButtonProps) {
    super('button', props);

    this.element!.classList.add('submit-button');

    if (Array.isArray(props.className)) {
      props.className.forEach((className) => this.element!.classList.add(className));
    } else {
      this.element!.classList.add(props.className);
    }

    this.element!.type = 'submit';
  }

  render() {
    return this.compile(template, { title: this.props.title });
  }
}
