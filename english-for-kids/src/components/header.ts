import { BaseComponent } from './base-component';
import { Menu } from './menu/menu';
import { Switcher } from './switcher';
import './header.scss';
import state from '../state';

export class Header extends BaseComponent {
  menu: Menu;

  constructor() {
    super('div', ['header']);

    this.menu = new Menu(state.categoryCard);

    this.element.append(this.menu.hamburger);
    this.element.append(this.menu.element);
    this.element.append(new Switcher().element);
  }
}
