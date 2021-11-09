import { BaseComponent } from '../base-component';
import './menu.scss';

export class ElementMenu extends BaseComponent {
  private withIcon: boolean;

  private icon: HTMLImageElement;

  constructor(category:string) {
    super('a', ['element-menu']);
    this.element.innerText = category;
    this.withIcon = true;
    this.icon = new Image();
    this.icon.src = `svg/${category}.svg`;
    this.icon.classList.add('icon');
    this.icon.onload = () => this.element.prepend(this.icon);
    this.icon.onerror = () => { this.element.style.paddingLeft = '60px'; };
  }
}
