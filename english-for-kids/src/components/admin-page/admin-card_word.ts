import { BaseComponent } from '../base-component';
import { AdminWordCardInterface, Interfaces } from '../../models/Interfaces';
import { CardFooterBtn } from '../login/card-footer-btn';
import { BaseInputComponent } from '../Base-Input-Component';
import {
  deleteWord, getWordsOfCategoryByIndex, replaceWord, upload,
} from '../../module/request';
import { FileLoadComponent } from './file-load-component';
import { dispatchChangeInAdminPage } from '../../store/actions';
import { getIndexByName, getLocation } from './functions';
import { CardComponent } from '../card-component';

export class AdminCardWord extends BaseComponent {
  private editFooterCard: CardFooterBtn;

  private index: number;

  private editMode: boolean;

  private isNew: boolean;

  private closeBtn: HTMLElement;

  private footerCard: CardFooterBtn;

  private categoryName: string;

  private indexCategory: number;

  private wordObj: Interfaces;

  private inputWord: BaseInputComponent;

  private inputTranslation: BaseInputComponent;

  private soundInput: FileLoadComponent;

  private imageInput: FileLoadComponent;

  constructor(config: AdminWordCardInterface) {
    super('div', ['admin-card', 'admin-card_word']);
    this.element.innerText = `${config.index}`;
    this.index = config.index;
    // eslint-disable-next-line prefer-destructuring
    this.categoryName = getLocation()[1];
    this.indexCategory = 999;
    this.wordObj = {
      word: '', translation: '', image: '', audioSrc: '',
    };
    this.editMode = config.edit;
    this.isNew = config.isNew;
    this.closeBtn = new BaseComponent('div', ['close-btn']).element;
    this.closeBtn.addEventListener('click', () => this.deleteThisCard());
    this.soundInput = new FileLoadComponent('Sound');
    this.soundInput.input.setAttribute('accept', 'audio/mp3');
    this.imageInput = new FileLoadComponent('Image');
    this.imageInput.input.setAttribute('accept', 'image/jpeg');
    const configEditFooterCard = {
      styles: 'adminCard__footer_edit',
      btnNames: ['Cancel', 'Save'],
      btnFuncs: [this.cancel.bind(this), this.saveThisCard.bind(this)],
    };
    this.editFooterCard = new CardFooterBtn(configEditFooterCard);
    const configFooterCard = {
      styles: 'adminCard__footer',
      btnNames: ['Change'],
      btnFuncs: [this.updateThisCard.bind(this)],
    };
    this.footerCard = new CardFooterBtn(configFooterCard);
    this.inputWord = new BaseInputComponent('Word', ['input_admin-card']);
    this.inputTranslation = new BaseInputComponent('Translation', ['input_admin-card']);

    this.init();
  }

  async init() {
    this.indexCategory = await getIndexByName(this.categoryName);
    await this.getWordElementByIndex();
    await this.fillCard();
  }

  async deleteThisCard() {
    const response = await deleteWord(this.categoryName, this.index);
    console.log(response);
    dispatchChangeInAdminPage('delete item');
  }

  async saveThisCard() {
    console.log(this.soundInput.filename);

    const config:Interfaces = {
      word: this.inputWord.value,
      translation: this.inputTranslation.value,
      image: `img/${this.imageInput.filename}`,
      audioSrc: `audio/${this.soundInput.filename}`,
    };
    const formData = new FormData();
    if (this.imageInput.file && this.soundInput.file) {
      formData.append('wordConfig', JSON.stringify(config));
      formData.append('photo', this.imageInput.file);
      formData.append('sound', this.soundInput.file);
    }

    upload(this.categoryName, this.index, formData).then(async () => {
      this.editMode = false;
      await this.init();
    }, () => alert('карточка не сохранилась'));
  }

  updateThisCard() {
    this.editMode = true;
    this.isNew = false;
    this.fillCard();
  }

  async fillCard() {
    this.element.innerHTML = '';
    if (!this.editMode) {
      this.element.innerHTML = `
${this.index}
      <h5 class="card-field__title">Word: <span class="card-field__content">${this.wordObj.word}</span></h5>
      <h5 class="card-field__title">Translation: <span class="card-field__content">${this.wordObj.translation}</span></h5>
      <h5 class="card-field__title">Sound file: <span class="card-field__content">${this.wordObj.audioSrc.split('/')[1]}</span></h5>
       <h5 class="card-field__title">Image:  <span class="card-field__content">${this.wordObj.image.split('/')[1]}</span></h5>
       <div class="img"  style='background-image: url("../${this.wordObj.image}")'> </div>`;
      this.element.append(this.closeBtn);
      this.element.append(this.footerCard.element);
      this.element.onclick = (e) => this.playAudio(e);
    } else {
      this.editFooterCard.showOnlyFirstBtn();
      this.element.innerText = `${this.index}`;
      this.element.append(this.inputWord.element);
      this.element.append(this.inputTranslation.element);
      this.element.append(this.soundInput.element);
      this.element.append(this.imageInput.element);
      this.element.append(this.editFooterCard.element);
      this.addEvent();
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

  async getWordElementByIndex() {
    const wordsArr = await getWordsOfCategoryByIndex(this.indexCategory);
    this.wordObj = wordsArr[this.index];
  }

  addEvent() {
    this.inputWord.input.onchange = () => this.showBtn();
    this.inputTranslation.input.onchange = () => this.showBtn();
    this.soundInput.input.onchange = () => this.showBtn();
    this.imageInput.input.onchange = () => this.showBtn();
  }

  showBtn() {
    console.log('chenge');
    if (this.inputWord.value && this.inputTranslation.value && this.imageInput.filename && this.soundInput.filename) this.editFooterCard.showOnlySecondBtn();
  }

  playAudio(e:MouseEvent) {
    let el;
    if (e.target instanceof HTMLElement) el = e.target;
    if (el) {
      if (el.classList.contains('img')) {
        new CardComponent({
          word: '', translation: '', image: '', audioSrc: '',
        }).playSound(`../${this.wordObj.audioSrc}`);
      }
    }
  }
}
