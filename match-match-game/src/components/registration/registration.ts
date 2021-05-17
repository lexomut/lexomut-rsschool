import './registration.scss';
import { BaseComponent } from '../base-component';
import { RegContainer } from './reg-container/reg-container';

export class Registration extends BaseComponent {
  private regContainer: RegContainer;

  private image: HTMLElement;

  private field: HTMLElement;

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
  }

 async reg() {
  await this.regContainer.inputAdd();
  }
}
