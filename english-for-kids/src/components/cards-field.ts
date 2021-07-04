import './cards-field.scss';
import { BaseComponent } from './base-component';
import { CardComponent } from './card-component';

export class CardsField extends BaseComponent {
  private cards: CardComponent[];

  private readonly rating: HTMLElement;

  constructor() {
    super('div', ['cards-field']);
    this.cards = [];
    this.rating = new BaseComponent('div', ['rating']).element;
    this.element.append(this.rating);
  }

  // clear() {
  //   this.cards = [];
  //   this.element.innerHTML = '';
  // }

  addCards(cards:CardComponent[]):Promise<void> {
    return new Promise((resolve) => {
      this.cards = cards;
      this.cards.forEach((card) => this.element.appendChild(card.element));
      resolve();
    });
  }

  addStar(status:boolean):void {
    if (status) this.rating.append(new BaseComponent('div', ['star_filled']).element);
    else this.rating.append(new BaseComponent('div', ['star']).element);
  }

  clearRating():void {
    this.rating.innerHTML = '';
  }
}
