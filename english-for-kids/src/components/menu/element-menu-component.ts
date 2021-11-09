import { BaseComponent } from '../base-component';
import './menu.scss';

export class ElementMenu extends BaseComponent {
  private icon: HTMLElement;

  constructor(category:string) {
    super('a', ['element-menu']);
    this.element.innerText = category;
    this.icon = new BaseComponent('object', ['icon']).element;
    this.icon.setAttribute('type', 'image/svg+xml');
    this.icon.setAttribute('data', `svg/${category}.svg`);
    this.element.prepend(this.icon);
  }
}
