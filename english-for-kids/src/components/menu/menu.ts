import { dispatchMouseClickOnMenu } from '../../store/actions';
import { BaseComponent } from '../base-component';
import { ElementMenu } from './element-menu-component';
import './menu.scss';
import store from '../../store/store';

let func: (arg: MouseEvent) => void;

export class Menu extends BaseComponent {
  hamburger: HTMLElement;

  private isShowMenu = false;

  private curentElementMenu: HTMLElement;

  private categories: string[];

  private readonly elements: ElementMenu[];

  constructor(categories: string[]) {
    super('div', ['menu', 'hide-menu']);
    this.categories = categories;
    if (!categories.includes('Home')) {
      this.categories.unshift('Home');
      this.categories.push('statistic');
    }
    this.curentElementMenu = new ElementMenu(categories[0]).element;
    this.elements = [];
    categories.forEach((elementMenuConfig, index) => {
      const elementMenu = new ElementMenu(elementMenuConfig);
      this.element.append(elementMenu.element);
      this.elements.push(elementMenu);

      if (!index) {
        elementMenu.element.classList.add('active');
        this.curentElementMenu = elementMenu.element;
      }
    });
    this.addLogin();

    this.hamburger = new BaseComponent('div', ['hamburger']).element;
    this.hamburger.innerHTML = '<div><span class="hamburger__line"></span></div>';
    func = this.menuHandler.bind(this);
    this.hamburger.addEventListener('click', this.hamburgerAction.bind(this));
    store.subscribe(() => {
      if (store.getState().link === 'Login') return;
      const currentCategory = this.elements.find((elem) => (elem.element.innerText === store.getState().link)) || this.elements[0];
      this.changeCurrentElementMenu(currentCategory.element);
    });
  }

  hamburgerAction(e: MouseEvent): void {
    e.stopPropagation();
    // console.log(e.target , this.isShowMenu);
    if (this.isShowMenu) {
      this.hideMenu();
      return;
    }
    this.showMenu();
  }

  showMenu(): void {
    // console.log('showMenu');
    this.isShowMenu = true;
    this.element.classList.remove('hide-menu');
    this.hamburger.classList.add('hamburger_active');
    this.addMenuHandler();
  }

  hideMenu(): void {
    // console.log('hideMenu');
    this.element.classList.add('hide-menu');
    this.hamburger.classList.remove('hamburger_active');
    this.isShowMenu = false;
  }

  addMenuHandler = (): void => {
    // console.log('add func');
    window.addEventListener('click', func);
  };

  removeMenuHandler = (): void => {
    window.removeEventListener('click', func);
  };

  menuHandler(e: MouseEvent): void {
    // console.log('func');
    if (!this.isShowMenu) return;
    if (e.target === this.element) return;
    if (e.target) {
      if ((e.target instanceof HTMLElement)) {
        if (e.target.classList.contains('element-menu')) {
          this.changeCurrentElementMenu(e.target);
          dispatchMouseClickOnMenu(e.target.innerText);
        }
      }
    }
    this.isShowMenu = false;
    this.hideMenu();
    // console.log('закрываем меню');
    this.removeMenuHandler();
  }

  changeCurrentElementMenu(elementMenu: HTMLElement): void {
    this.curentElementMenu.classList.remove('active');
    elementMenu.classList.add('active');
    this.curentElementMenu = elementMenu;
  }

  addLogin() {
    const login = new ElementMenu('Login').element;
    login.classList.add('login');
    this.element.append(login);
  }
}
