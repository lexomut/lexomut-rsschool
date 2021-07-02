import './cards-field.scss';
import { BaseComponent } from './base-component';
import { CardComponent } from './card-component';

export class CardsField extends BaseComponent {
  private cards: CardComponent[];

  private rating: HTMLElement;

  constructor() {
    super('div', ['cards-field']);
    this.cards = [];
    this.rating = new BaseComponent('div', ['rating']).element;
    this.element.append(this.rating);
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

  addStar(status:boolean) {
    if (status) this.rating.append(new BaseComponent('div', ['star_filled']).element);
    else this.rating.append(new BaseComponent('div', ['star']).element);
  }

  clearRating() {
    this.rating.innerHTML = '';
  }
}
