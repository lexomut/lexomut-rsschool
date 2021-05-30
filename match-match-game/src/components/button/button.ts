import { BaseComponent } from '../base-component';
import './button.scss';
import { Input } from '../input/input';

interface ConstructorParams {
  name: string;
  func: (...arg: Array<any>) =>unknown;
  args: unknown[];

}

export class Button extends BaseComponent {
  result: unknown = [];

  constructor({
    name, func, args,
  }: ConstructorParams) {
    super('button', ['button']);
    this.element.innerText = name;
    this.element.addEventListener('click', () => {
      this.result = func(...args);
    });
  }
}
