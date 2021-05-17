import { BaseComponent } from '../base-component';
import { CardsField } from '../cards-field/cards-field';
import { Card } from '../card/card';
import { delay } from '../../shared/delay';
import { Timer } from '../timer/timer';

const FLIP_DELAY = 3000;

export class Game extends BaseComponent {
  private timer;

  private readonly cardsField: CardsField;

  private activeCard? : Card;

  private isAnimation = false;

  constructor() {
    super();
    this.cardsField = new CardsField();
    this.element.appendChild(this.cardsField.element);
    this.timer = new Timer();
    this.element.appendChild(this.timer.element);
  }

  async newGame(images:string[]) {
    this.cardsField.clear();
    const cards = images
      .concat(images)
      .map((url) => new Card(url))
      .sort(() => Math.random() - 0.5);
    cards.forEach((card) => {
      card.element.addEventListener('click', () => { this.cardHandler(card); });
    });

    await this.cardsField.addCards(cards);
    this.timer.startTimer();
  }

  private async cardHandler(card:Card) {
    if (this.isAnimation) return;
    if (card.isFlipped) return;
    this.isAnimation = true;

    await card.flipToFront();
    if (!this.activeCard) {
      this.activeCard = card;
      this.isAnimation = false;

      return;
    }

    if (this.activeCard.image !== card.image) {
      await delay(FLIP_DELAY);
      // console.log('после паузы')
      await Promise.all([this.activeCard.flipToBack(), card.flipToBack()]);
    }

    const check = () => {
      for (let i = 0; i < this.cardsField.element.children.length; i += 1) {
        if (this.cardsField.element.children[i].classList.contains('flipped')) return;
      }
      this.timer.stopTimer();
    };
    check();

    // console.log('конец функции')
    this.activeCard = undefined;
    this.isAnimation = false;
  }
}
