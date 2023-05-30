import template from './back.hbs';
import { Block } from '@/shared/utils/Block';

interface BackProps {
  events: {
    click: (event: Event) => void,
  };
}

export class Back extends Block<BackProps> {
  constructor(props: BackProps) {
    super('aside', props);
  }

  render() {
    return this.compile(template, this.props);
  }
}
