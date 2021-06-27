import './cards-field.scss';
import { BaseComponent } from './base-component';
import { CardComponent } from './card-component';

const SHOW_TIME = 5;
export class CardsField extends BaseComponent {
  private cards: CardComponent[];

  constructor() {
    super('div', ['cards-field']);
    this.cards = [];
  }

  clear() {
    this.cards = [];
    this.element.innerHTML = '';
  }

  addCards(cards:CardComponent[]) {
    return new Promise((resolve) => {
      this.cards = cards;
      this.cards.forEach((card) => this.element.appendChild(card.element));

      setTimeout(() => this.cards.forEach((card) => {
        // card.flipToBack();
        resolve('done');
      }), SHOW_TIME * 1000);
    });
  }
}
