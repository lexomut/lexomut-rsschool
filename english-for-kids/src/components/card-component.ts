import { CartInterface } from '../models/CartInterface';
import store from '../store/store';
import { BaseComponent } from './base-component';
import './card.scss';
import { Signature } from './signature';
import { IS_TRAIN_MODE } from '../store/constants';
import { IT_IS_CATEGORY } from '../data/constants';

const FLIP_CLASS = 'flipped';

export class CardComponent extends BaseComponent {
  img: string;

  word: string;

  translation: string;

  audioSrc: string;

  // private template: string;

  private isFlipped: boolean;

  card: BaseComponent;

  signature: Signature;

  constructor(config:CartInterface) {
    super('a', ['card-container']);
    this.img = `./${config.image}`;
    this.word = config.word;
    this.translation = config.translation;
    this.audioSrc = `./${config.audioSrc}`;

    this.signature = new Signature(this.word, this.translation);
    // this.element.innerHTML = '<div>';
    this.isFlipped = true;
    this.card = new BaseComponent('div', ['card']);

    this.card.element.style.backgroundImage = `url(${this.img})`;
    this.element.append(this.card.element);
    if (store.getState().mode) this.card.element.append(this.signature.element);
    store.subscribe(() => {
      // console.log(store.getState());

      if (store.getState().mode) this.showSignature();
      else {
        if (this.translation === IT_IS_CATEGORY) return;
        this.hideSignature();
      }
    });
  }

  flipToBack() {
    this.isFlipped = false;
    return this.flip(true);
  }

  flipToFront() {
    this.isFlipped = true;
    return this.flip();
  }

  private flip(isFront = false): Promise<void> {
    return new Promise(((resolve) => {
      this.element.classList.toggle(FLIP_CLASS, isFront);
      this.element.addEventListener('transitionend', () => setTimeout(() => resolve(), 500), { once: true });
    }));
  }

  playSound = (src:string) => {
    const audio = new Audio();
    audio.src = src;
    audio.currentTime = 0;
    return audio.play();
  };

  hideSignature() {
    this.card.element.innerHTML = '';
  }

  showSignature() {
    this.card.element.append(this.signature.element);
  }

  clickAudioPlayInTrainMode() {
    if (!store.getState().mode) return;
    // console.log(this.audioSrc);
    if (!this.isFlipped) return;
  this.playSound(this.audioSrc);
  }
}
