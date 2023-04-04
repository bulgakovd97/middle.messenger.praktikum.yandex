import template from './404.hbs';
import { Block } from '@/shared/utils/Block';
import { Error } from '@/components/index';

export class NotFoundPage extends Block {
  constructor() {
    super('div');

    this.element?.classList.add('centering');
  }

  init() {
    this.children.error = new Error({ code: '404', description: 'Не туда попали' });
  }

  render() {
    return this.compile(template, this.props);
  }
}
