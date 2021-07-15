import { BaseComponent } from '../base-component';

import {
  createCategory, createEmptyWord, getCategories, getWords, getWordsOfCategoryByIndex,
} from '../../module/request';
import { AdminCategoryCardInterface, AdminWordCardInterface, Interfaces } from '../../models/Interfaces';

import { AdminCardWord } from './admin-card_word';
import { getIndexByName } from './functions';
import store from '../../store/store';

export class WordsField extends BaseComponent {
  private name: string;

  private index: number|undefined;

  words:Interfaces[];

  private cardConfigs: AdminWordCardInterface[];

  private cardNewItem: HTMLElement;

  constructor(word:string) {
    super('div', ['admin-field', 'cards-field']);
    this.name = word;
    this.words = [];
    this.cardConfigs = [];
    this.cardNewItem = new BaseComponent('div', ['admin-card']).element;
    this.element.innerText = this.name;
    this.fill();

    store.subscribe(() => {
      if (store.getState().actionOfChange === 'delete item') {
        this.fill();
      }
    });
  }

  async getItem() {
    await this.getWordsFromServer();
    this.words.forEach((item, index) => {
      this.cardConfigs.push({
        index,
        edit: false,
        isNew: false,
      });
    });
  }

  async getWordsFromServer() {
    if (this.index) {
      this.words = await getWordsOfCategoryByIndex(this.index);
    }
  }

  async fill() {
    this.index = await getIndexByName(this.name);
    this.words = [];
    this.cardConfigs = [];
    await this.getWordsFromServer();
    await this.getItem();
    this.element.innerHTML = '';
    this.cardConfigs.forEach((card) => this.element.append(new AdminCardWord(card).element));
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
    await createEmptyWord(this.name).then(async (message) => {
      let words = [];
      if (this.index) words = await getWordsOfCategoryByIndex(this.index);
      const index = words.length - 1;
      const configNewCard:AdminCategoryCardInterface = {
        index,
        edit: true,
        isNew: true,
      };
      const newCard = new AdminCardWord(configNewCard);
      this.cardNewItem.before(newCard.element);
    }, (e) => {
      console.log(e);
    });
  }
}
