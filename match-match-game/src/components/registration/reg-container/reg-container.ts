import { BaseComponent } from '../../base-component';
import { Input } from '../../input/input';
import './reg-container.scss';

// export interface InputObjWrap{
//   InputObj : Input ;
// }

export class RegContainer extends BaseComponent {
  inputs :Input[] = [];

  constructor() {
    super('div', ['registration__container']);
  }

  async inputAdd() {
    const res = await fetch('./input-fields.json');
    const fields = await res.json();
    fields.forEach(
      (item:{ label:string, pattern:string, message:string }, index:number) => {
        const { label, pattern, message } = item;
        const input = new Input(label, pattern, message);
        this.inputs.push(input);
        this.element.appendChild(input.element);
      },
    );
  }
}
