import { BaseComponent } from '../base-component';
import { AdminPageHeader } from './admin-page___header';
import './admin-page.scss';
import {AdminFieldCategories} from "./admin-field";

export class AdminPage extends BaseComponent {
  private rootElement: HTMLElement;

  private header: AdminPageHeader;

  constructor(rootElement:HTMLElement) {
    super('div', ['admin-page']);
    this.rootElement = rootElement;
    this.header = new AdminPageHeader();
  }

  render() {
    return new Promise((resolve) => {
      this.rootElement.innerText = '';
      this.rootElement.append(this.element);
      this.element.append(this.header.element);
      this.header.logOut.addEventListener('click', resolve);
      this.element.append(new AdminFieldCategories().element);
    });
  }
}
