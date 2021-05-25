import './registration.scss';
import { BaseComponent } from '../base-component';
import { RegContainer } from './reg-container/reg-container';
import { Button } from '../button/button';
import { GetInputsValue } from './reg-container/get-inputs-value';

export class Registration extends BaseComponent {
  private regContainer: RegContainer;

  private image: HTMLElement;

  private field: HTMLElement;

  private button: Button;

  private values: unknown;

  constructor() {
    super('div', ['registration-page']);
    this.element.innerHTML = 'Registr new Player';
    this.field = new BaseComponent('div', ['registration__field']).element;
    this.regContainer = new RegContainer();
    this.image = new BaseComponent('img', ['registration__img']).element;
    this.image.style.background = 'url("Ellipse 5.svg") center no-repeat';
    this.element.appendChild(this.field);
    this.field.appendChild(this.regContainer.element);
    this.field.appendChild(this.image);
    // this.button = new Button({ name: 'кнопка', func: console.log, param: ['PRESS BUTTON', '2 press'] });

    this.button = new Button({
      name: 'получить зачения инпутов', func: GetInputsValue, args: this.regContainer.inputs,
    });
    this.element.appendChild(this.button.element);
    this.values = this.button.result;
  }

  async reg() {
    await this.regContainer.inputAdd();
    console.log(this.regContainer.inputs);
  }
}
