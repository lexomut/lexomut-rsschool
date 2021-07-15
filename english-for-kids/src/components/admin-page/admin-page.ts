import { BaseComponent } from '../base-component';
import { AdminPageHeader } from './admin-page___header';
import './admin-page.scss';
import { AdminFieldCategories } from './admin-field';
import { getCategories } from '../../module/request';
import { WordsField } from './admin-field-words';
import { getLocation } from './functions';
import { CardsField } from '../cards-field';

export class AdminPage extends BaseComponent {
  private rootElement: HTMLElement;

  private header: AdminPageHeader;

  private categoryField: HTMLElement;

  private wordsField: HTMLElement|undefined;

  constructor(rootElement:HTMLElement) {
    super('div', ['admin-page']);
    this.rootElement = rootElement;
    this.header = new AdminPageHeader();
    // this.wordsField = new WordsField('').element;
    this.categoryField = new AdminFieldCategories().element;

    // store.subscribe(() => {
    //   const action = store.getState().actionOfChange.split(',');
    //   if (action[0] === 'addWord') this.showWordCadsField((action[1]));
    // });
  }

  render() {
    return new Promise((resolve) => {
      this.rootElement.innerText = '';
      this.rootElement.append(this.element);
      this.element.append(this.header.element);
      if (!getLocation()[0]) window.history.pushState(null, 'null', '/categories');
      this.header.logOut.addEventListener('click', () => {
        window.history.pushState(null, 'null', '/');
        resolve('');
        window.onpopstate = null;
      });
      window.onpopstate = async (event:PopStateEvent) => {
        event.preventDefault();
        this.router();
      };

      this.router();
    });
  }

  async router() {
    const path = getLocation();
    const categories = await getCategories();
    if (path[0] === 'categories') {
      if (!path[1]) this.showCategoryCadsField();
      else if (categories.find((item) => path[1] === item)) this.showWordCadsField(path[1]);
    }
  }

  showWordCadsField(word:string) {
    this.header.element.classList.add('item-field-active');
    if (document.getElementsByClassName('admin-field')[0]) {
      this.element.removeChild(this.categoryField);
    }
    this.wordsField = new WordsField(word).element;
    this.element.append(this.wordsField);
  }

  showCategoryCadsField() {
    this.header.element.classList.remove('item-field-active');
    window.history.pushState(null, 'null', '/categories');
    if (document.getElementsByClassName('admin-field')[0]) {
      if (this.wordsField) this.element.removeChild(this.wordsField);
    }
    this.categoryField = new AdminFieldCategories().element;
    this.element.append(this.categoryField);
  }
}
