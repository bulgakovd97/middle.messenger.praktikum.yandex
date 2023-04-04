import template from './500.hbs';
import { Block } from '../../shared/utils/Block';
import { Error } from '../../components/error';

export class ErrorPage extends Block {
  constructor() {
    super('div');

    this.element?.classList.add('centering');
  }

  init() {
    this.children.error = new Error({ code: '500', description: 'Мы уже фиксим' });
  }

  render() {
    return this.compile(template, this.props);
  }
}
