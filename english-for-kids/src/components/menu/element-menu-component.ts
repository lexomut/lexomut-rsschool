import { BaseComponent } from '../base-component';

export class ElementMenu extends BaseComponent {
  constructor(category:string) {
    super('a', ['element-menu']);
    this.element.innerText = category;
  }
}
