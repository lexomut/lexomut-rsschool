import { dispatchChangeSwitch } from '../store/actions';
import { BaseComponent } from './base-component';
import './switcher.scss';

export class Switcher extends BaseComponent {
  private input: HTMLInputElement;

  constructor() {
    super('label', ['switch']);
    this.input = document.createElement('input');
    this.input.setAttribute('type', 'checkbox');
    this.input.setAttribute('id', 'togBtn');
    this.element.append(this.input);
    this.input.insertAdjacentHTML('afterend', `
 <div class="slider round">
<span class="on" id="on">train</span>
  <span class="off">game</span>
 </div>`);
    this.input.checked = true;
    this.input.addEventListener('change', (e) => {
      dispatchChangeSwitch(this.input.checked);
    });
  }
}
