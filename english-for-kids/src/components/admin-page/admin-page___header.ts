import { BaseComponent } from '../base-component';

export class AdminPageHeader extends BaseComponent {
   logOut: HTMLElement;

  constructor() {
    super('nav', ['admin-page___header']);
    this.element.innerHTML = '<a class="nav_element">Categories</a><aclass="nav_element">Words</a>';
    this.logOut = new BaseComponent('a', ['nav_element', 'log-out']).element;
    this.logOut.innerText = 'Log out';
    this.element.append(this.logOut);
  }
}
