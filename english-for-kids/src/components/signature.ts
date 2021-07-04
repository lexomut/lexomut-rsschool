import { BaseComponent } from './base-component';
import { IT_IS_CATEGORY } from '../data/constants';

export class Signature extends BaseComponent {
  word: string;

  flipBtn: BaseComponent;

  private readonly translate: string | undefined;

  constructor(word: string, translate: string | undefined) {
    super('div', ['signature']);

    this.word = word;
    if (translate != null) {
      this.translate = translate;
    }
    this.element.innerText = word;
    this.flipBtn = new BaseComponent('a', ['flip-btn']);
    this.flipBtn.element.innerHTML = '&#x21bb';
    if (this.translate !== IT_IS_CATEGORY) this.flipBtnAdd();
  }

  flipBtnAdd():void {
    setTimeout(() => {
      this.element.append(this.flipBtn.element);
      this.showWord();
    }, 100);
  }

  flipBtnRemove():void {
    this.flipBtn.element.remove();
    this.showTranslate();
  }

  showWord():void {
    this.element.innerText = this.word;
    this.element.append(this.flipBtn.element);

    this.element.classList.remove('reverse');
  }

  showTranslate():void {
    this.element.innerText = this.translate || '';
    this.element.classList.add('reverse');
  }
}
