import { BaseComponent } from '../base-component';
import './input.scss';

export class Input extends BaseComponent {
  private label: HTMLElement;

  readonly inputField: HTMLInputElement;

  private error: HTMLElement;

  private regulExp: RegExp;

  private message: string;

  status: boolean;

  value = '';

  constructor(labelName:string, regulExp:string, message:string) {
    super('div', ['input']);
    this.message = message;
    this.regulExp = new RegExp(regulExp);
    this.label = new BaseComponent('label', ['input__label']).element;
    this.label.innerText = labelName;
    this.error = new BaseComponent('div', ['input__error']).element;
    this.inputField = document.createElement('input');
    this.inputField.classList.add('input__field');
    this.element.appendChild(this.label);
    this.element.appendChild(this.inputField);
    this.element.appendChild(this.error);
    this.inputField.addEventListener('change', () => this.check());
    this.status = false;
  }

  check() {
    this.value = this.inputField.value;
    this.status = false;
    this.error.innerText = '';
    this.error.classList.remove('input__error_active');

    if (this.inputField.value === '') {
      this.error.innerText = 'fill in this field';
      this.error.classList.add('input__error_active');
    } else if (!this.inputField.value.match(this.regulExp) || !this.inputField.value.match(/[A-Za-zа-яА-Я]/)) {
      this.element.style.background = '#ff67003d';
      this.error.innerText = this.message;
      this.error.classList.add('input__error_active');
      this.inputField.addEventListener('input', () => this.check());
    } else {
      this.element.style.background = '';
      this.status = true;
      this.inputField.removeEventListener('input', () => this.check());
    }
  }
}
