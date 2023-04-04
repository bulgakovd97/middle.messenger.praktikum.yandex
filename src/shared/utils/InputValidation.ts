import {
  emailMaxLength,
  emailMinLength,
  emailRegex,
  loginMaxLength,
  loginMinLength,
  loginRegex,
  nameMaxLength,
  nameMinLength,
  nameRegex,
  passwordMaxLength,
  passwordMinLength,
  passwordRegex,
  phoneMaxLength,
  phoneMinLength,
  phoneRegex,
} from '../lib';

export interface CheckData {
  regex?: RegExp;
  minLength?: number;
  maxLength?: number;
}

export class InputValidation {
  private _input: HTMLInputElement | null;
  private _name: string;
  private _value: string;
  private _error: HTMLParagraphElement | null;
  private _label: HTMLLabelElement | null;
  private _regex: RegExp | undefined = undefined;
  private _minLength: number | undefined = undefined;
  private _maxLength: number | undefined = undefined;

  constructor(input: HTMLInputElement) {
    this._input = input;
    this._name = this._input.name;
    this._value = this._input.value;

    this._error = this._input.parentElement!.nextElementSibling as HTMLParagraphElement;
    this._label = this._input.previousElementSibling as HTMLLabelElement;
  }

  private _getUnifiedInputName(inputName: string): string {
    if (inputName.toLowerCase().includes('name')) {
      return 'name';
    } else if (inputName.toLowerCase().includes('password')) {
      return 'password';
    }

    return inputName;
  }

  private _getCheckData(): CheckData {
    const name = this._getUnifiedInputName(this._name);

    switch (name) {
      case 'name':
        this._regex = nameRegex;
        this._minLength = nameMinLength;
        this._maxLength = nameMaxLength;
        break;

      case 'password':
        this._regex = passwordRegex;
        this._minLength = passwordMinLength;
        this._maxLength = passwordMaxLength;
        break;

      case 'email':
        this._regex = emailRegex;
        this._minLength = emailMinLength;
        this._maxLength = emailMaxLength;
        break;

      case 'login':
        this._regex = loginRegex;
        this._minLength = loginMinLength;
        this._maxLength = loginMaxLength;
        break;

      case 'phone':
        this._regex = phoneRegex;
        this._minLength = phoneMinLength;
        this._maxLength = phoneMaxLength;
        break;

      default:
        break;
    }

    return { regex: this._regex, minLength: this._minLength, maxLength: this._maxLength };
  }

  private _matchValue(): boolean {
    const { regex } = this._getCheckData();

    if (!regex) return false;

    return Boolean(this._value.match(regex)?.[0]);
  }

  private _checkLength(): boolean {
    const { minLength, maxLength } = this._getCheckData();

    if (!minLength || !maxLength) return false;

    return this._value.length >= this._minLength! && this._value.length <= this._maxLength!;
  }

  public validate(): boolean {
    const isValid = this._matchValue() && this._checkLength();

    if (isValid) {
      this._hideError();
    } else {
      this._showError();
    }

    return isValid;
  }

  private _showError(): void {
    this._error!.style.display = 'block';
    this._input!.style.borderBottomColor = '#ff2f2f';

    if (this._error!.classList.contains('profile-input-block__error')) {
      this._label!.style.borderBottomColor = '#ff2f2f';
    }
  }

  private _hideError(): void {
    this._error!.style.display = 'none';

    if (this._error!.classList.contains('profile-input-block__error')) {
      this._input!.style.borderBottomColor = '#eaeaea';
      this._label!.style.borderBottomColor = '#eaeaea';
    } else {
      this._input!.style.borderBottomColor = '#0ec2c2';
    }
  }
}
