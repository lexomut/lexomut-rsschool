import { Game } from './module/game';
import { wordCarts } from './data/data';
import { Header } from './components/header';

export class App {
  game: Game;

  private element: HTMLBodyElement;

  constructor(rootElement:HTMLBodyElement) {
    this.game = new Game();
    this.element = rootElement;
    this.element.append(new Header().element);
  }

  newGame() {
    this.element.append(this.game.cardsField.element);
    this.game.newGame(wordCarts[1]);
  }
}
