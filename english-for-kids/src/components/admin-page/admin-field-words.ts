import { BaseComponent } from '../base-component';

import {
  createCategory, createEmptyWord, getCategories, getWords, getWordsOfCategoryByIndex,
} from '../../module/request';
import { AdminCategoryCardInterface, AdminWordCardInterface, Interfaces } from '../../models/Interfaces';

import { AdminCardWord } from './admin-card_word';
import { getIndexByName } from './functions';
import store from '../../store/store';
import { AdminCategoryCard } from './admin-card';
import { WIDTH_CARD } from './admin-field';

export class WordsField extends BaseComponent {
  private name: string;

  private index: number|undefined;

  words:Interfaces[];

  private cardConfigs: AdminWordCardInterface[];

  private cardNewItem: HTMLElement;

  private elementsArr: HTMLElement[];

  constructor(word:string) {
    super('div', ['admin-field', 'cards-field']);
    this.name = word;
    this.words = [];
    this.elementsArr = [];
    this.cardConfigs = [];
    this.cardNewItem = new BaseComponent('div', ['admin-card']).element;
    this.element.innerText = this.name;
    this.fill();

    store.subscribe(() => {
      if (store.getState().actionOfChange === 'delete item') {
        this.fill();
        this.elementsArr = [];
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
    if (this.index !== undefined) {
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

    this.elementsArr = this.cardConfigs.map((card) => new AdminCardWord(card).element);
    // this.addCardNewItem();
    this.push();
  }

  push() {
    const body = document.getElementsByTagName('body')[0];
    const width = body.offsetWidth < 1100 ? body.offsetWidth : 1100;
    const row = (width - (width % WIDTH_CARD)) / WIDTH_CARD;
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
    await createEmptyWord(this.name).then(async (message) => {
      let words = [];
      if (this.index !== undefined) words = await getWordsOfCategoryByIndex(this.index);
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
