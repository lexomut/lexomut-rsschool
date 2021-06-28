import './cards-field.scss';
import { BaseComponent } from './base-component';
import { CardComponent } from './card-component';

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
      resolve('done');
    });
  }
}
