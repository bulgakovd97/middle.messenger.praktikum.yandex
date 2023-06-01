import template from './button-group.hbs';
import { Block } from '@/shared/utils/Block';
import router from '@/shared/utils/Router';
import { Routes } from '@/shared/lib';
import authController from '@/controllers/AuthController';

interface ButtonGroupProps {
  className: string[];
}

export class ButtonGroup extends Block<ButtonGroupProps> {
  constructor(props: ButtonGroupProps) {
    super('div', props);

    const { className } = props;

    className.forEach((name) => {
      this.element!.classList.add(name);
    });
  }

  get editButton() {
    return this.element!.firstElementChild as HTMLButtonElement;
  }

  get passwordButton() {
    return this.element!.querySelector('.edit-form__button_type_password') as HTMLButtonElement;
  }

  get logoutButton() {
    return this.element!.querySelector('.edit-form__button_type_logout') as HTMLButtonElement;
  }

  render() {
    return this.compile(template, this.props);
  }

  protected componentDidMount() {
    this.passwordButton.addEventListener('click', () => router.go(Routes.EDIT_PASSWORD));
    this.logoutButton.addEventListener('click', this._handleLogout.bind(this));
  }

  private _handleLogout() {
    authController.logout();
  }
}
