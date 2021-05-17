import { BaseComponent } from '../../base-component';
import { Input } from '../../input/input';
import './reg-container.scss';

export class RegContainer extends BaseComponent {
  constructor() {
    super('div', ['registration__container']);
  }

  async inputAdd() {
    console.log('inputAdd start');
    const res = await fetch('./input-fields.json');
    const fields = await res.json();
    fields.forEach((item:{ label:string, pattern:string, message:string }) => {
      const { label, pattern, message } = item;
      const input = new Input(label, pattern, message).element;
      this.element.appendChild(input);
    });
  }
}
