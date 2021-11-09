import { BaseComponent } from '../base-component';
import './header.scss';

export class HeaderButton extends BaseComponent {
  constructor(name:string, imageSvg:string) {
    super('div', ['header-button']);
    this.element.innerHTML = `
<svg class="header-button__img">${imageSvg}</svg> 
<div class="header-button__name">${name}</div>`;
  }
}
