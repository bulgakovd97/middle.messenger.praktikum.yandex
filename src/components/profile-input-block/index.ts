import template from './profile-input-block.hbs';
import { Block } from '@/shared/utils/Block';

interface ProfileInputBlockProps {
  for: string;
  label: string;
  type: string;
  id: string;
  name: string;
  value?: string;
  errorMessage: string;
  disabled: boolean;
  events: {
    focusin: (event: Event) => void,
    focusout: (event: Event) => void,
  };
}

export class ProfileInputBlock extends Block<ProfileInputBlockProps> {
  constructor(props: ProfileInputBlockProps) {
    super('div', props);

    const { disabled } = props;

    this.element!.classList.add('profile-input-block');

    if (disabled) {
      this.input!.setAttribute('disabled', '');
    }
  }

  get input() {
    return this.element!.querySelector('input');
  }

  render() {
    return this.compile(template, this.props);
  }
}
