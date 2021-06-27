import { CardComponent } from '../components/card-component';
import { CardsField } from '../components/cards-field';
import { CardInterface } from '../models';

const i = 1;

function addClickListener(card: CardComponent) {
  card.signature.flipBtn.element.onclick = function f() {
    card.element.onclick = null;
    card.signature.flipBtnRemove();
    const flipToBackComplete = card.flipToBack();
    card.element.addEventListener('mouseleave', () => {
      flipToBackComplete.then(async () => {
        card.signature.flipBtnAdd();
        await card.flipToFront();
        console.log('обратно');
        addClickListener(card);
      });
    }, { once: true });
  };
}

export class Game {
  cardsField: CardsField;

  constructor() {
    this.cardsField = new CardsField();
  }

  async newGame(config: CardInterface[]) {
    const cards = config
      .map((card) => new CardComponent(card))
      .sort(() => Math.random() - 0.5);

    cards.forEach((card) => {
      addClickListener(card);
    });
    await this.cardsField.addCards(cards);
  }
}
