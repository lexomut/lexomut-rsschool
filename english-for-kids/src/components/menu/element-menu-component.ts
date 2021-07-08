import { BaseComponent } from '../base-component';
import './menu.scss';

export class ElementMenu extends BaseComponent {
icon: HTMLElement;

  constructor(category:string) {
    super('a', ['element-menu']);
    this.element.innerText = category;
    this.icon = document.createElement('img');
    this.icon.setAttribute('src', `svg/${category}.svg`);
    this.icon.classList.add('icon');

    // this.icon.setAttribute('width', '20px');
    // this.icon.setAttribute('height', '20px');
    // this.icon = new BaseComponent('object', ['icon']).element;
    // this.icon.setAttribute('type', 'image/svg+xml');
    // this.icon.setAttribute('data', `svg/${category}.svg`);
    this.element.prepend(this.icon);
  }
}
