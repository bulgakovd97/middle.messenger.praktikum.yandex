export interface CheckDataProps {
  regex: RegExp;
  minLength: number;
  maxLength: number;
}

interface InputValidationProps {
  input: HTMLInputElement | null;
  checkData: {
    regex: RegExp;
    minLength?: number;
    maxLength?: number;
  };
}

export class InputValidation {
  private _input: HTMLInputElement | null;
  private _value: string;
  private _error: HTMLParagraphElement | null;
  private _label: HTMLLabelElement | null;
  private _regex: RegExp;
  private _minLength?: number;
  private _maxLength?: number;

  constructor(props: InputValidationProps) {
    const { input, checkData } = props;

    this._input = input as HTMLInputElement;
    const { value } = this._input;
    this._value = value;

    this._error = this._input.parentElement!.nextElementSibling as HTMLParagraphElement;
    this._label = this._input.previousElementSibling as HTMLLabelElement;

    const { regex, minLength, maxLength } = checkData;

    this._regex = regex;
    this._minLength = minLength;
    this._maxLength = maxLength;
  }

  private _matchValue(): boolean {
    return Boolean(this._value.match(this._regex)?.[0]);
  }

  private _checkLength(): boolean {
    return this._value.length >= this._minLength! && this._value.length <= this._maxLength!;
  }

  private _showError(): void {
    this._error!.style.display = 'block';
    this._input!.style.borderBottom = '1px solid #ff2f2f';

    if (this._error!.classList.contains('profile-input-block__error')) {
      this._label!.style.borderBottom = '1px solid #ff2f2f';
    }
  }

  private _hideError(): void {
    this._error!.style.display = 'none';

    if (this._error!.classList.contains('profile-input-block__error')) {
      this._input!.style.borderBottom = '1px solid #eaeaea';
      this._label!.style.borderBottom = '1px solid #eaeaea';
    } else {
      this._input!.style.borderBottom = '1px solid #0ec2c2';
    }
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
}
