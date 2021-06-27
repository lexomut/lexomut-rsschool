import { BaseComponent } from './base-component';

export class Signature extends BaseComponent {
  word: string;

  flipBtn: BaseComponent;

  private translate: string | undefined;

  constructor(word: string, translate: string | undefined) {
    super('div', ['signature']);

    this.word = word;
    if (translate != null) {
      this.translate = translate;
    }
    this.element.innerText = word;
    this.flipBtn = new BaseComponent('a', ['flip-btn']);
    this.flipBtn.element.innerHTML = '&#x21bb';
    this.flipBtnAdd();
  }

  flipBtnAdd() {
    setTimeout(() => {
      this.element.append(this.flipBtn.element);
      this.showWord();
    }, 100);
  }

  flipBtnRemove() {
    this.flipBtn.element.remove();
    this.showTranslate();
  }

  showWord() {
    this.element.innerText = this.word;
    this.element.append(this.flipBtn.element);

    this.element.classList.remove('reverse');
  }

  showTranslate() {
    this.element.innerText = this.translate || '';
    this.element.classList.add('reverse');
  }
}
