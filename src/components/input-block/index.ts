import template from './input-block.hbs';
import { Block } from '@/shared/utils/Block';

interface InputBlockProps {
  for: string;
  label: string;
  type: string;
  id: string;
  name: string;
  placeholder: string;
  errorClass: string;
  errorMessage: string;
  events: {
    focusin: (event: Event) => void,
    focusout: (event: Event) => void,
  };
}

export class InputBlock extends Block<InputBlockProps, HTMLInputElement> {
  constructor(props: InputBlockProps) {
    super('div', props);

    this.element!.classList.add('input-block');
  }
  get input() {
    return this.element!.querySelector('input');
  }

  render() {
    return this.compile(template, this.props);
  }
}
