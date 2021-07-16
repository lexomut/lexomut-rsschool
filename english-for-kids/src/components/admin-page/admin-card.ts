import { BaseComponent } from '../base-component';

import '../../assets/cross.svg';
import { AdminCategoryCardInterface } from '../../models/Interfaces';
import { CardFooterBtn } from '../login/card-footer-btn';
import {
  createCategory, deleteCategory, getCategories, getWordsOfCategoryByIndex, renameCategory,
} from '../../module/request';
import { dispatchChangeInAdminPage } from '../../store/actions';
import { BaseInputComponent } from '../Base-Input-Component';

export class AdminCategoryCard extends BaseComponent {
  index: number;

  private closeBtn: HTMLElement;

  private editFooterCard: CardFooterBtn;

  private footerCard: CardFooterBtn;

  private editMode: boolean;

  private input: BaseInputComponent;

  private isNew: boolean;

  constructor(config:AdminCategoryCardInterface) {
    super('div', ['admin-card']);
    this.index = config.index;
    this.editMode = config.edit;
    this.isNew = config.isNew;
    this.closeBtn = new BaseComponent('div', ['close-btn']).element;
    this.closeBtn.addEventListener('click', () => this.deleteThisCard());
    const configEditFooterCard = {
      styles: 'adminCard__footer_edit',
      btnNames: ['Cancel', 'Create'],
      btnFuncs: [this.cancel.bind(this), this.create.bind(this)],
    };
    this.editFooterCard = new CardFooterBtn(configEditFooterCard);
    const configFooterCard = {
      styles: 'adminCard__footer',
      btnNames: ['Update', 'Add item'],
      btnFuncs: [this.updateThisCard.bind(this), this.addWord.bind(this)],
    };
    this.footerCard = new CardFooterBtn(configFooterCard);
    this.input = new BaseInputComponent('Category name', ['input_admin-card']);

    this.fillCard();
  }

  async deleteThisCard() {
    const response = await deleteCategory(this.index);
    dispatchChangeInAdminPage('delete');
  }

  updateThisCard() {
    this.editMode = true;
    this.fillCard();
  }

  async fillCard() {
    this.element.innerHTML = '';
    this.element.innerText = `${this.index}`;
    if (!this.editMode) {
      this.element.append(this.closeBtn);
      await this.element.append(await this.getNameElementByIndex());
      await this.element.append(await this.getElementAmount());
      this.element.append(this.footerCard.element);
    } else {
      this.element.innerText = `${this.index}`;
      this.element.append(this.input.element);
      this.element.append(this.editFooterCard.element);
    }
  }

  async cancel() {
    if (this.isNew) {
      await this.deleteThisCard();
      if (this.element.parentNode) {
        this.element.parentNode.removeChild(this.element);
      }
    } else this.editMode = false;
    this.fillCard();
  }

  async create() {
    if (this.input.value) {
      await renameCategory(this.input.value, this.index).then(async () => {
        this.element.innerHTML = '';
        this.editMode = false;
        this.isNew = false;
        await this.fillCard();
      }, (e) => {
        this.input.message.innerText = e;
      });
    } else this.input.message.innerText = 'fill in this field';
  }

  async addWord() {
    const name = await getCategories();
    const nameUrl = name[this.index].replace(/ /g, '_');
    window.history.pushState(null, 'null', `/categories/${nameUrl}`);
    const popStateEvent = new PopStateEvent('popstate');
    dispatchEvent(popStateEvent);
    // dispatchChangeInAdminPage(`addWord,${this.index}`);
  }

  async getNameElementByIndex() {
    const name = await getCategories();
    const nameElement = new BaseComponent('div', ['admin-category-card__name']).element;
    nameElement.innerText = `${name[this.index]}`;

    return nameElement;
  }

  async getElementAmount() {
    const category = await getWordsOfCategoryByIndex(this.index);
    const amountElement = new BaseComponent('div', ['admin-category-card__amount']).element;
    amountElement.innerText = `WORDS: ${category.length}`;
    return amountElement;
  }
}
