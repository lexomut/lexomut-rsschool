import { Game } from './module/game';
import { categoryCard, wordCarts } from './data/data';
import { Header } from './components/header';
import { IT_IS_CATEGORY } from './data/constants';
import store from './store/store';
import { CartInterface } from './models/CartInterface';

export class App {
  game: Game;

  private element: HTMLBodyElement;

  private currentLink: string;

  constructor(rootElement: HTMLBodyElement) {
    this.game = new Game();
    this.element = rootElement;
    this.element.append(new Header().element);
    this.currentLink = '';
    store.subscribe(() => {
      this.stateHadler(store.getState().link);
    });
    this.element.append(this.game.cardsField.element);
  }

  newGame(cardArr: CartInterface[]) {
    this.game.newGame(cardArr);
  }

  makeCategoryObj = () => {
    const tempCategoryCard = categoryCard.filter((item, index, arr) => index !== 0 && index !== arr.length - 1);
    return tempCategoryCard.map((item, index) => ({
      word: item, translation: IT_IS_CATEGORY, image: wordCarts[index][1].image, audioSrc: '',
    }));
  };

  stateHadler(link: string) {
    if (link === this.currentLink) return;
    this.currentLink = link;
    // console.log('new game',this.currentLink, );
    this.game.cardsField.element.innerHTML = '';
    const index = categoryCard.findIndex((item) => item === link);
    if (index === 0) this.newGame(this.makeCategoryObj());
    else this.newGame(wordCarts[index - 1]);
  }
}
