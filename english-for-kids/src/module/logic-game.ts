import { CardComponent } from '../components/card-component';
import store from '../store/store';

export class LogicGame {
  readonly cards: CardComponent[];

  private cardsField: HTMLElement;

  private currentCards: CardComponent[];

  private currentCardIndex: number;

  private currentCard: CardComponent;

  private end: boolean;

  constructor(cards: CardComponent[], cardsField: HTMLElement) {
    this.cardsField = cardsField;
    this.cards = cards;
    this.currentCards = this.cards.map((item) => item).sort(() => Math.random() - 0.5);
    this.currentCardIndex = 0;
    // eslint-disable-next-line prefer-destructuring
    this.currentCard = this.currentCards[0];

    this.end = false;
    store.subscribe(() => {
      this.cardsField.onclick = null;
    });
    setTimeout(() => this.currentCard.playSound(this.currentCard.audioSrc), 1000);
  }

  check() {
    if (this.end) return;
    this.handler().then(() => {
      this.rightChoice();
    }, () => {
      this.incorrectChoice();
      this.check();
    });
  }

 async startGame() {
    this.currentCardIndex--;
    await this.next();
  }

  handler() {
    return new Promise((resolve, reject) => {
      // console.log('промис');
      this.cardsField.onclick = (e) => {
        if (!(e.target instanceof HTMLElement)) return;
        if (!(e.target.classList.contains('card'))) return;
        if ((e.target.classList.contains('opacity'))) return;
        if (e.target === this.currentCard.element.firstChild) resolve('совпало');
        reject();
      };
    });
  }

  rightChoice() {
    this.currentCard.playSound('./audio/correct.mp3');
    this.currentCard.card.element.classList.add('opacity');
    this.next();
  }

  incorrectChoice() {
    this.currentCard.playSound('./audio/error.mp3');
  }

  next() {
    return new Promise((resolve) => {
      this.currentCardIndex++;
      if (this.currentCardIndex < this.currentCards.length) {
        this.currentCard = this.currentCards[this.currentCardIndex];
        setTimeout(() => this.currentCard.playSound(this.currentCard.audioSrc), 1000);
        this.check();
      } else {
        console.log('you win');
        setTimeout(() => this.currentCard.playSound('./audio/success.mp3'), 1000);
        resolve('done');
      }
    });
  }
}
