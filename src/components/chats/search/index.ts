import temlate from './search.hbs';
import { Block } from '../../../shared/utils/Block';
// @ts-ignore
import search from '../../../../static/search.svg';

interface SearchProps {
  events: {
    keyup: (event: Event) => void,
  };
}

export class Search extends Block<SearchProps, HTMLInputElement> {
  constructor(props: SearchProps) {
    super('div', props);

    this.element!.classList.add('search');
    (this.element!.querySelector('.search__icon') as HTMLImageElement).src = search;
  }

  init() {}

  render() {
    return this.compile(temlate, this.props);
  }
}
