import template from './error.hbs';
import { Block } from '../../shared/utils/Block';

interface ErrorProps {
  code: string;
  description: string;
}

export class Error extends Block<ErrorProps> {
  constructor(props: ErrorProps) {
    super('main', props);
  }

  init() {
    this.element?.classList.add('error-main');
  }

  render() {
    return this.compile(template, this.props);
  }
}
