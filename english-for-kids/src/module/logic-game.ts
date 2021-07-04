import { CardComponent } from '../components/card-component';
import store from '../store/store';
import { CardsField } from '../components/cards-field';
import { statistic } from './statistic';

export class LogicGame {
  readonly cards: CardComponent[];

  currentCard: CardComponent;

  private currentCards: CardComponent[];

  private currentCardIndex: number;

  private cardsField: CardsField;

  private withError: boolean;

  constructor(cards: CardComponent[], cardsField: CardsField) {
    this.cardsField = cardsField;
    this.cards = cards;
    this.currentCards = this.cards.map((item) => item).sort(() => Math.random() - 0.5);
    this.currentCardIndex = 0;
    this.currentCard = this.currentCards[this.currentCardIndex];

    this.withError = false;
    store.subscribe(() => {
      this.breack();
    });
  }

  check():void {
    this.handler().then(() => {
      this.rightChoice();
    }, () => {
      this.incorrectChoice();
      this.check();
    });
  }

  startGame():Promise<void> {
    return new Promise((resolve) => {
      this.currentCards = this.cards.map((item) => item).sort(() => Math.random() - 0.5);
      this.currentCardIndex = 0;
      this.currentCard = this.currentCards[this.currentCardIndex];
      setTimeout(() => this.currentCard.playSound(this.currentCard.audioSrc), 1000);
      this.currentCardIndex--;
      this.next();
      this.cardsField.element.addEventListener('end', () => resolve());
    });
  }

  handler():Promise<void> {
    return new Promise((resolve, reject) => {
      this.cardsField.element.onclick = (e) => {
        if (!(e.target instanceof HTMLElement)) return;
        if (!(e.target.classList.contains('card'))) return;
        if ((e.target.classList.contains('opacity'))) return;
        if (e.target === this.currentCard.element.firstChild) resolve();
        reject();
      };
    });
  }

  rightChoice():void {
    this.cardsField.addStar(true);
    this.currentCard.playSound('./audio/correct.mp3');
    this.currentCard.card.element.classList.add('opacity');
    statistic.rightClick(this.currentCard.word);
    this.next();
  }

  incorrectChoice():void {
    this.withError = true;
    this.cardsField.addStar(false);
    this.currentCard.playSound('./audio/error.mp3');
    statistic.incorrectClick(this.currentCard.word);
  }

  async next():Promise<void> {
    this.currentCardIndex++;
    if (this.currentCardIndex < this.currentCards.length) {
      this.currentCard = this.currentCards[this.currentCardIndex];
      const prom = () => new Promise((resolve) => {
        setTimeout(async () => {
          await this.currentCard.playSound(this.currentCard.audioSrc);
          setTimeout(resolve, 500);
        }, 1000);
      });
      await prom();
      this.check();
    } else {
      this.result().then(() => {
        this.cardsField.element.dispatchEvent(new Event('end'));
      });
    }
  }

  breack():void {
    this.cardsField.element.onclick = null;
    this.currentCards.forEach((card) => card.card.element.classList.remove('opacity'));
    this.cardsField.clearRating();
  }

  result():Promise<void> {
    return new Promise(((resolve) => {
      if (this.cardsField.element.nextElementSibling) {
        if (this.cardsField.element.nextElementSibling.parentNode) {
          this.cardsField.element.nextElementSibling.parentNode.removeChild(this.cardsField.element.nextElementSibling);
        }
      }
      if (!this.withError) {
        setTimeout(() => {
          this.currentCard.playSound('./audio/success.mp3');
          this.cardsField.element.innerHTML = '<img src="./img/success.jpg"alt="success" width="50%" height="auto">';
        }, 1000);
      } else {
        setTimeout(() => {
          this.currentCard.playSound('./audio/failure.mp3');
          this.cardsField.element.innerHTML = '<img src="./img/failure.jpg"alt="failure" width="50%" height="auto">';
        }, 1000);
      }

      setTimeout(() => {
        this.cardsField.element.innerHTML = '';
        resolve();
      }, 3000);
    }));
  }
}
