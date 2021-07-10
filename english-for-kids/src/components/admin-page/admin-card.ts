import { BaseComponent } from '../base-component';

import '../../assets/cross.svg';
import { AdminCategoryCardInterface } from '../../models/CartInterface';
import { CardFooterBtn } from '../login/card-footer-btn';
import {
  createCategory, deleteCategory, getCategories, getWordsOfCategoryByIndex,
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

  constructor(config:AdminCategoryCardInterface) {
    super('div', ['admin-card']);
    this.index = config.index;
    this.editMode = config.edit;
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
      btnNames: ['Update', 'Add word'],
      btnFuncs: [this.updateThisCard.bind(this), this.addWord.bind(this)],
    };
    this.footerCard = new CardFooterBtn(configFooterCard);
    this.input = new BaseInputComponent('Category name', ['input_admin-card']);
    console.log(this.editMode);
    if (this.editMode) this.fillCardEditMode();
    else this.fillCard();
  }

  async deleteThisCard() {
    const response = await deleteCategory(this.index);
    dispatchChangeInAdminPage('delete');
    console.log(this.index);
    console.log(response);
  }

  updateThisCard() {
    console.log('update', this);
  }

  async fillCard() {
    this.element.innerText = `${this.index}`;
    this.element.append(this.closeBtn);
    await this.element.append(await this.getNameElementByIndex());
    await this.element.append(await this.getElementAmount());
    this.element.append(this.footerCard.element);
  }

  fillCardEditMode() {
    this.element.innerText = `${this.index}`;
    this.element.append(this.input.element);
    this.element.append(this.editFooterCard.element);
  }

  async cancel() {
    await this.deleteThisCard();
    if (this.element.parentNode) {
      this.element.parentNode.removeChild(this.element);
    }
    console.log('cancel', this);
  }

  async create() {
    console.log('записать карточку в базу', this.input.value);
    await createCategory(this.input.value);
    this.element.innerHTML = '';
    this.editMode = false;
    console.log(await this.fillCard());
  }

  addWord() {
    console.log('addWord', this);
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
