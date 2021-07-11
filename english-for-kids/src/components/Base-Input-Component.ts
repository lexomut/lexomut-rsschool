import { BaseComponent } from "./base-component";

export class BaseInputComponent {
  readonly element: HTMLElement;

  label: HTMLLabelElement;

  readonly input: HTMLInputElement;

  value: string;

   message: HTMLElement;

  constructor(labelText:string, styles: string[] = [], type = 'text') {
    this.element = document.createElement('form');
    this.label = document.createElement('label');
    this.label.innerText = labelText;
    this.input = document.createElement('input');
    this.label.style.display = 'block';
    this.input.style.display = 'block';
    this.element.classList.add(...styles);
    this.label.append(this.input);
    this.input.setAttribute('type', type);
    this.value = this.input.value;
    this.input.addEventListener('change', () => { this.value = this.input.value; });
    this.element.append(this.label);
    this.message = new BaseComponent('div', ['message']).element;
    this.element.append(this.message);
  }
}
