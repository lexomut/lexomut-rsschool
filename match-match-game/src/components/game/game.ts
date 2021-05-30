import { BaseComponent } from '../base-component';
import { CardsField } from '../cards-field/cards-field';
import { Card } from '../card/card';
import { delay } from '../../shared/delay';
import { Timer } from '../timer/timer';
import appState from '../appState/appState';
import { IDB } from '../indexeDB/indexeDB';

const FLIP_DELAY = 3000;

export class Game extends BaseComponent {
  private timer;

  private readonly cardsField: CardsField;

  private activeCard? : Card;

  private isAnimation = false;

  private score:number;

  private errors:number;

  private move:number;

  constructor() {
    super();

    this.cardsField = new CardsField();
    this.timer = new Timer();
    this.timer.element.innerText = '00:00';
    this.score = 0;
    this.element.appendChild(this.timer.element);

    this.element.appendChild(this.cardsField.element);
    this.errors = 0;
    this.move = 0;
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
    if (appState.stopGame) return;
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
      // setTimeout(() => {  card.error(); }, 0);
      this.errors++;
      console.log(this.errors);
      await delay(FLIP_DELAY);
      // setTimeout(() => card.noError(), 1000);
      console.log('после паузы');
      await Promise.all([this.activeCard.flipToBack(), card.flipToBack()]);
    }

    const check = () => {
      for (let i = 0; i < this.cardsField.element.children.length; i += 1) {
        if (this.cardsField.element.children[i].classList.contains('flipped')) return;
      }
      window.location.hash = 'stop';
      // appState.stopGame = true;
      appState.stateHeaderBtn = 'start';

      let score = (this.move - this.errors) * 100 - (this.timer.second * 10);
      if (score < 0) score = 0;

      if (appState.currentPlayerScore < score) {
        appState.currentPlayerObj.score = score;
        console.log(score);
        const db = new IDB();
        db.save(appState.currentPlayerObj);
        db.loadAll(console.log);
      }

      this.timer.stopTimer();
    };
    check();

    console.log('конец функции');
    this.move++;
    this.activeCard = undefined;
    this.isAnimation = false;
  }
}
