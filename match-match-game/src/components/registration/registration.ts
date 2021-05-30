import './registration.scss';
import { BaseComponent } from '../base-component';
import { RegContainer } from './reg-container/reg-container';
import { Button } from '../button/button';
import { GetInputsValue } from './reg-container/get-inputs-value';

import { Input } from '../input/input';

import appState from '../appState/appState';

export class Registration extends BaseComponent {
  private regContainer: RegContainer;

  private image: HTMLElement;

  private field: HTMLElement;

  private button: Button;

  private values: unknown;

  private buttonCancel: Button;

  private submit: HTMLElement;

  private shadow: HTMLElement;

  constructor(shadow:HTMLElement) {
    super('div', ['registration-page']);

    this.shadow = shadow;
    this.element.innerHTML = 'Registr new Player';

    this.field = new BaseComponent('div', ['registration__field']).element;
    this.regContainer = new RegContainer();
    this.image = new BaseComponent('img', ['registration__img']).element;
    this.submit = new BaseComponent('div', ['registration__submit']).element;
    this.image.style.background = 'url("Ellipse 5.svg") center no-repeat';
    this.element.appendChild(this.field);

    this.field.appendChild(this.regContainer.element);
    this.field.appendChild(this.image);

    this.button = new Button({
      name: 'ADD USER', func: GetInputsValue, args: this.regContainer.inputs,
    });
    this.button.element.setAttribute('disabled', 'true');
    this.element.appendChild(this.button.element);
    this.values = this.button.result;
    this.buttonCancel = new Button({
      name: 'CANCEL', func: () => {}, args: [],
    });
    this.button.element.setAttribute('disabled', 'true');
    this.element.appendChild(this.submit);
    this.submit.appendChild(this.button.element);
    this.submit.appendChild(this.buttonCancel.element);
  }

  async reg() {
    await this.regContainer.inputAdd();
    this.regContainer.inputs.forEach((item:Input) => {
      item.element.addEventListener('change', () => {
        this.checkValidationAll();
      });
    });
    this.button.element.addEventListener('click', () => {
      this.closePopup();
      appState.stateHeaderBtn = 'start';
      console.log(`${appState.regUser}  appState.regUser`);
    });
    this.buttonCancel.element.addEventListener('click', () => this.closePopup());
  }

  checkValidationAll() {
    function checkAndShowSubBtn(inputs:Input[], button:HTMLElement) {
      if (inputs[0].status && inputs[1].status && inputs[2].status) {
        button.removeAttribute('disabled');
      } else button.setAttribute('disabled', 'true');
    }
    checkAndShowSubBtn(this.regContainer.inputs, this.button.element);
  }

  closePopup() {
    window.location.hash = '';
    this.shadow.style.display = 'none';
  }
}
