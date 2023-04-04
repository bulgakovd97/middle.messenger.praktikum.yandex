import template from './profile-input-block.hbs';
import { Block } from '@/shared/utils/Block';

interface ProfileInputBlockProps {
  for: string;
  label: string;
  type: string;
  id: string;
  name: string;
  placeholder: string;
  errorMessage: string;
  disabled: boolean;
  events: {
    focusin: (event: Event) => void,
    focusout: (event: Event) => void,
  };
}

export class ProfileInputBlock extends Block<ProfileInputBlockProps, HTMLInputElement> {
  constructor(props: ProfileInputBlockProps) {
    super('div', props);

    const { disabled } = props;

    this.element!.classList.add('profile-input-block');

    if (disabled) {
      this.element!.querySelector('input')!.setAttribute('disabled', '');
    }
  }

  render() {
    return this.compile(template, this.props);
  }
}
