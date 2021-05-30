import './card.scss';
import { BaseComponent } from '../base-component';

const FLIP_CLASS = 'flipped';

export class Card extends BaseComponent {
  isFlipped = false;

  constructor(readonly image: string) {
    super('div', ['card-container']);
    this.image = image;
    this.element.innerHTML = `<div class="card">
        <div class="card__front" style = "background-image: url('images/${image}')"></div>
        <div class="card__back"></div>
       </div>`;
  }

  error() {
    const img = this.image;
    this.element.innerHTML = `<div class="card">
        <div class="card__front" style = " background: linear-gradient( rgba(255, 0, 0, 0.3), rgba(255, 0, 0, 0.3)) , url('images/${img}')center no-repeat"></div>
        <div class="card__back"></div>
       </div>`;
  }

  noError() {
    const img = this.image;
    this.element.innerHTML = `<div class="card">
        <div class="card__front" style = "background: url('images/${img}')center no-repeat"></div>
        <div class="card__back"></div>
       </div>`;
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
      this.element.addEventListener('transitionend', () => resolve(), { once: true });
    }));
  }
}
