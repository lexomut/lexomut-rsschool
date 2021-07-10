import { BaseComponent } from '../base-component';
import './admin-page.scss';

export class AdminPageHeader extends BaseComponent {
   logOut: HTMLElement;

  constructor() {
    super('header', ['admin-page__header']);
    this.element.innerHTML = '<a class="nav_element">Categories</a><a class="nav_element">Words</a>';
    this.logOut = new BaseComponent('a', ['nav_element', 'log-out']).element;
    this.logOut.innerText = 'Log out';
    this.element.append(this.logOut);
  }
}
