import { AdminCategoryCardInterface, Interfaces } from '../../models/Interfaces';
import { createCategory, getCategories, getWords } from '../../module/request';
import state from '../../state';
import { BaseComponent } from '../base-component';
import { AdminCategoryCard } from './admin-card';
import store from '../../store/store';

const WIDTH_CARD = 260;

export class AdminFieldCategories extends BaseComponent {
  private nameCategories: string[];

  private words: Interfaces[][];

  private categories: AdminCategoryCardInterface[];

  private cardNewItem: HTMLElement;

  private elementsArr: HTMLElement[];

  constructor() {
    super('div', ['admin-field', 'cards-field']);
    this.nameCategories = [''];
    this.words = state.wordCarts;
    this.categories = [];
    this.elementsArr = [];
    this.cardNewItem = new BaseComponent('div', ['admin-card']).element;
    this.fill();
    store.subscribe(() => {
      if (store.getState().actionOfChange === 'delete') {
        this.fill();
        // setTimeout(() =>, 200);
      }
    });
  }

  async getItem() {
    this.nameCategories = await getCategories();
    this.words = await getWords();
    this.nameCategories.forEach((item, index) => {
      this.categories.push({
        index,
        edit: item === 'empty',
        isNew: false,
      });
    });
  }

  async fill() {
    this.categories = [];
    await this.getItem();
    this.element.innerHTML = '';
    this.elementsArr = this.categories.map((card) => new AdminCategoryCard(card).element);
    // this.addCardNewItem();
    this.push();
  }

  push() {
    const body = document.getElementsByTagName('body')[0];
    const width = body.offsetWidth < 1100 ? body.offsetWidth : 1100;
    const row = (width - (width % WIDTH_CARD)) / WIDTH_CARD;
    console.log(row, 'row');
    const height = window.innerHeight;
    const column = (height - (height % WIDTH_CARD)) / WIDTH_CARD;
    let begin = 0;
    let end = row * column;
    const add = () => {
      for (let i = begin; i < end; i++) {
        if (this.elementsArr[i]) {
          this.element.append(this.elementsArr[i]);
          if (i === this.elementsArr.length - 1) this.addCardNewItem();
        }
      }
      begin = end;
      end = end + row > this.elementsArr.length ? this.elementsArr.length : end + row;
    };
    window.addEventListener('scroll', () => {
      if (window.pageYOffset + height - 50 >= this.element.clientHeight) {
        add();
      }
    });
    add();
    if (window.pageYOffset + height - 50 >= this.element.clientHeight) {
      add();
    }
  }

  addCardNewItem() {
    this.cardNewItem.innerHTML = '<h4>Add new category</h4>';
    const plus = new BaseComponent('div', ['plus']).element;
    this.cardNewItem.append(plus);
    plus.onclick = () => this.addNewCard();
    this.element.append(this.cardNewItem);
  }

  async addNewCard() {
    await createCategory('empty');
    const categories = await getCategories();
    const index = categories.length - 1;
    const configNewCard:AdminCategoryCardInterface = {
      index,
      edit: true,
      isNew: true,
    };
    const newCard = new AdminCategoryCard(configNewCard);
    this.cardNewItem.before(newCard.element);
  }
}
