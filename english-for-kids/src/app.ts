import { Game } from './module/game';
import cards from './data/data';
import { CardInterface } from './models';
import {Switcher} from "./components/switcher";

// const category:CardInterface = cards[1];
export class App {
  game: Game;

  private element: HTMLBodyElement;

  constructor(rootElement:HTMLBodyElement) {
    this.game = new Game();
    this.element = rootElement;
    this.element.append(new Switcher().element);
  }

  newGame() {
    this.element.append(this.game.cardsField.element);
    this.game.newGame(cards[2]);
  }
}
