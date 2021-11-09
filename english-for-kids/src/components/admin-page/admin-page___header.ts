import { BaseComponent } from '../base-component';
import './admin-page.scss';

export class AdminPageHeader extends BaseComponent {
  logOut: HTMLElement;

  constructor() {
    super('header', ['admin-page__header']);
    this.element.innerHTML = '<div class="nav_element">Categories</div><div class="nav_element">Words</div>';
    this.logOut = new BaseComponent('a', ['nav_element', 'log-out']).element;
    this.logOut.innerText = 'Log out';
    this.element.append(this.logOut);
    this.element.querySelectorAll('.nav_element')[0]
      .addEventListener('click', () => this.goToCategoryPage());
  }

  goToCategoryPage = () => {
    window.history.pushState(null, 'null', '/categories');
    const popStateEvent = new PopStateEvent('popstate');
    dispatchEvent(popStateEvent);
  };
}
