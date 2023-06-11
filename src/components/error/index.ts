import template from './error.hbs';
import { Block } from '@/shared/utils/Block';
import Router from '@/shared/utils/Router/Router';
import { Routes } from '@/shared/lib';

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

  get linkButton() {
    return this.element!.querySelector('.error__link-button') as HTMLButtonElement;
  }

  render() {
    return this.compile(template, this.props);
  }

  protected componentDidMount() {
    this.linkButton.addEventListener('click', () => Router.go(Routes.CHATS));
  }
}
