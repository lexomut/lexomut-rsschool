import { BaseComponent } from '../base-component';
import './manual.scss';

export class Manual extends BaseComponent {
  constructor() {
    super('img', ['manual']);
    this.element.setAttribute('src', './images/Group 1.png');
  }
}
