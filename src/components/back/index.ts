import template from './back.hbs';
import { Block } from '@/shared/utils/Block';

export class Back extends Block {
  constructor() {
    super('aside');
  }

  render() {
    return this.compile(template, {});
  }
}
