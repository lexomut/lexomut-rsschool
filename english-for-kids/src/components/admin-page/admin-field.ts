import { AdminCategoryCardInterface, CartInterface } from '../../models/CartInterface';
import { createCategory, getCategories, getWords } from '../../module/request';
import state from '../../state';
import { BaseComponent } from '../base-component';
import { AdminCategoryCard } from './admin-card';
import store from '../../store/store';

export class AdminFieldCategories extends BaseComponent {
  private nameCategories: string[];

  private words: CartInterface[][];

  private categories: AdminCategoryCardInterface[];

  private cardNewItem: HTMLElement;

  constructor() {
    super('div', ['admin-field', 'cards-field']);
    this.nameCategories = [''];
    this.words = state.wordCarts;
    this.categories = [];
    this.cardNewItem = new BaseComponent('div', ['admin-card']).element;
    this.fill();
    store.subscribe(() => {
      console.log(store.getState());
      if (store.getState().actionOfChange === 'delete') {
        setTimeout(() => this.fill(), 200);
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
      });
    });
  }

  async fill() {
    this.categories = [];
    await this.getItem();
    this.element.innerHTML = '';
    this.categories.forEach((card) => this.element.append(new AdminCategoryCard(card).element));
    this.addCardNewItem();
  }

  addCardNewItem() {
    this.cardNewItem.innerHTML = '<h4>Add new category</h4>';
    const plus = new BaseComponent('div', ['plus']).element;
    this.cardNewItem.append(plus);
    plus.onclick = () => this.addNewCard();
    this.element.append(this.cardNewItem);
  }

  async addNewCard() {
    await console.log(await createCategory('empty'));
    const categories = await getCategories();
    const index = categories.length - 1;
    const configNewCard:AdminCategoryCardInterface = {
      index,
      edit: true,
    };
    const newCard = new AdminCategoryCard(configNewCard);
    this.cardNewItem.before(newCard.element);
  }
}
