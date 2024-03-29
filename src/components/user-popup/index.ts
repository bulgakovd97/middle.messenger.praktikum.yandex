import { InputValidation } from '@/shared/utils/InputValidation';
import { InputBlock } from '../input-block';
import template from './user-popup.hbs';
import { Block } from '@/shared/utils/Block';
import { SubmitButton } from '../submit-button';

interface UserPopupProps {
  title: string;
  buttonText?: string;
}

export class UserPopup extends Block<UserPopupProps> {
  constructor(props: UserPopupProps) {
    super('div', props);

    this.element!.classList.add('popup');
    this.element!.classList.add('user-popup');
  }

  init() {
    this.children.loginInput = new InputBlock({
      for: 'login',
      id: 'login',
      label: 'Логин',
      name: 'login',
      placeholder: 'Логин',
      type: 'text',
      errorClass: 'input-block__error_type_login',
      errorMessage: 'Неверный логин',
      events: {
        focusin: (event) => new InputValidation(event.target as HTMLInputElement).validate(),
        focusout: (event) => new InputValidation(event.target as HTMLInputElement).validate(),
      },
    });

    this.children.submitButton = new SubmitButton({
      className: ['.submit-button', 'user-popup-form__button'],
      buttonText: 'Добавить',
    });
  }

  render() {
    return this.compile(template, this.props);
  }

  componentDidUpdate() {
    (this.children.submitButton as SubmitButton).setProps({ buttonText: this.props.buttonText });
    return true;
  }
}
