import template from './main.hbs';
import { Block } from '@/shared/utils/Block';

export class MainPage extends Block {
  constructor() {
    super('div');

    this.element!.classList.add('centering');
  }

  render() {
    return this.compile(template, this.props);
  }
}
