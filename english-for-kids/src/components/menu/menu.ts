import { dispatchMouseClickOnMenu } from '../../store/actions';
import { BaseComponent } from '../base-component';
import { ElementMenu } from './element-menu-component';
import './nenu.scss';

let func:(arg:MouseEvent)=>void;

export class Menu extends BaseComponent {
  private categories:string [];

  hamburger: HTMLElement;

  private isShowMenu = false;

  constructor(categories:string[]) {
    super('div', ['menu', 'hide-menu']);
    this.categories = categories;
    this.categories.unshift('Home');
    this.categories.push('statistic');

    categories.forEach((elementMenuConfig) => {
      const elementMenu = new ElementMenu(elementMenuConfig);
      this.element.append(elementMenu.element);
    });
    this.hamburger = new BaseComponent('div', ['hamburger']).element;
    this.hamburger.innerHTML = '<div><span class="hamburger__line"></span></div>';
    func = this.menuHandler.bind(this);
    this.hamburger.addEventListener('click', this.hamburgerAction.bind(this));
  }

  hamburgerAction(e:MouseEvent) {
    e.stopPropagation();
    // console.log(e.target , this.isShowMenu);
    if (this.isShowMenu) {
      this.hideMenu();
      return;
    }
    this.showMenu();
  }

  showMenu() {
    // console.log('showMenu');
    this.isShowMenu = true;
    this.element.classList.remove('hide-menu');
    this.hamburger.classList.add('hamburger_active');
    this.addMenuHandler();
  }

  hideMenu() {
    // console.log('hideMenu');
    this.element.classList.add('hide-menu');
    this.hamburger.classList.remove('hamburger_active');
    this.isShowMenu = false;
  }

  addMenuHandler = () => {
    // console.log('add func');
    window.addEventListener('click', func);
  };

  removeMenuHandler = () => {
    window.removeEventListener('click', func);
  };

  menuHandler(e:MouseEvent) {
    // console.log('func');
    if (!this.isShowMenu) return;
    if (e.target === this.element) return;
    if (e.target) {
      if ((e.target instanceof HTMLElement)) {
        if (e.target.classList.contains('element-menu')) dispatchMouseClickOnMenu(e.target.innerText);
      }
    }
    this.isShowMenu = false;
    this.hideMenu();
    // console.log('закрываем меню');
    this.removeMenuHandler();
  }
}
