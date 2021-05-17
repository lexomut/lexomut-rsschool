import './cards-field.scss';
import { BaseComponent } from '../base-component';
import { Card } from '../card/card';

const SHOW_TIME = 3;
export class CardsField extends BaseComponent {
  private cards : Card[] = [];

  constructor() {
    super('div', ['cards-field']);
  }

  clear() {
    this.cards = [];
    this.element.innerHTML = '';
  }

  addCards(cards:Card[]) {
    return new Promise((resolve) => {
      this.cards = cards;
      this.cards.forEach((card) => this.element.appendChild(card.element));

      setTimeout(() => this.cards.forEach((card) => {
        card.flipToBack();
        resolve('done');
      }), SHOW_TIME * 1000);
    });
  }
}
