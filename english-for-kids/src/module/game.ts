import { CardComponent } from '../components/card-component';
import { CardsField } from '../components/cards-field';
import { IT_IS_CATEGORY } from '../data/constants';
import { CardInterface } from '../models';
import { dispatchMouseClickOnMenu } from '../store/actions';
import { statistic } from './statistic';

function addClickFlipper(card: CardComponent) {
  card.signature.flipBtn.element.onclick = function f() {
    card.element.onclick = null;
    card.signature.flipBtnRemove();
    const flipToBackComplete = card.flipToBack();
    card.element.addEventListener('mouseleave', () => {
      flipToBackComplete.then(async () => {
        card.signature.flipBtnAdd();
        await card.flipToFront();
        addClickFlipper(card);
      });
    }, { once: true });
  };
}

export class Game {
  cardsField: CardsField;

  cards: CardComponent[] | undefined;

  constructor() {
    this.cardsField = new CardsField();
  }

  async newGame(config: CardInterface[]) {
    const cards = config
      .map((card) => new CardComponent(card));
      // .sort(() => Math.random() - 0.5);
    this.cards = cards;
    cards.forEach((card) => {
      if (card.translation === IT_IS_CATEGORY) {
        this.addEwentsHomePage(card);
      } else {
        this.addEwentsInTrainMode(card);
      }
    });

    await this.cardsField.addCards(cards);
  }

  addEwentsInTrainMode = async (card: CardComponent) => {
    addClickFlipper(card);
    const prom = () => new Promise(((resolve) => {
      card.element.addEventListener('click', async () => {
        await card.clickAudioPlayInTrainMode.call(card);
        statistic.trainClick(card.word);
        resolve('');
      }, { once: true });
    }));

    prom().then(() => setTimeout(() => { this.addEwentsInTrainMode(card); }, 500));
  };

  addEwentsHomePage = (card: CardComponent) => {
    card.element.addEventListener('click', () => dispatchMouseClickOnMenu(card.word));
  };
}
