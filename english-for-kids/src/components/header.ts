import { categoryCard } from '../data/data';
import { BaseComponent } from './base-component';
import { Menu } from './menu/menu';
import { Switcher } from './switcher';
import './header.scss';

export class Header extends BaseComponent {
  menu: Menu;

  constructor() {
    super('div', ['header']);

    this.menu = new Menu(categoryCard);
    // console.log('header');
    this.element.append(this.menu.hamburger);
    this.element.append(this.menu.element);
    this.element.append(new Switcher().element);
  }
}
