import template from './profile-input-block.hbs';
import { Block } from '../../shared/utils/Block';

interface ProfileInputBlockProps {
  for: string;
  label: string;
  type: string;
  id: string;
  name: string;
  placeholder: string;
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
      this.element!.lastElementChild!.setAttribute('disabled', '');
    }
  }

  render() {
    return this.compile(template, {
      for: this.props.for,
      label: this.props.label,
      type: this.props.type,
      id: this.props.id,
      name: this.props.name,
      placeholder: this.props.placeholder,
    });
  }
}
