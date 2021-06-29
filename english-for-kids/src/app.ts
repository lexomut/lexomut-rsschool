import { Game } from './module/game';
import { categoryCard, wordCarts } from './data/data';
import { Header } from './components/header';
import { IT_IS_CATEGORY } from './data/constants';
import store from './store/store';
import { CartInterface } from './models/CartInterface';
import { BaseComponent } from './components/base-component';
import './components/app.scss';

let eventFunc:()=>void;

export class App {
  game: Game;

  private element: HTMLBodyElement;

  private currentLink: string;

  private currentCards: CartInterface[];

  private startGameBtn: HTMLElement = new BaseComponent('div', ['start-game-btn']).element;

  private currentMode: boolean;

  private gameBegin: boolean|undefined;

  constructor(rootElement: HTMLBodyElement) {
    eventFunc = this.tempMethod.bind(this);
    this.startGameBtn = new BaseComponent('div', ['start-game-btn']).element;
    this.game = new Game();
    this.element = rootElement;
    this.element.append(new Header().element);
    this.currentLink = '';
    this.currentMode = true;
    this.currentCards = this.makeCategoryObj();
    store.subscribe(() => {
      this.stateHandler(store.getState().link);
      this.addRemoveStartGameBtn(store.getState().mode);
      this.gameBegin = false;
    });
    this.gameBegin = false;
    this.element.append(this.game.cardsField.element);
    this.addRemoveStartGameBtn();
  }

  newGame() {
    this.game.newGame(this.currentCards);
  }

  makeCategoryObj = () => {
    const tempCategoryCard = categoryCard.filter((item, index, arr) => index !== 0 && index !== arr.length - 1);
    return tempCategoryCard.map((item, index) => ({
      word: item, translation: IT_IS_CATEGORY, image: wordCarts[index][1].image, audioSrc: '',
    }));
  };

  stateHandler(link: string) {
    if (link === this.currentLink) return;
    this.currentLink = link;
    // console.log('new game',this.currentLink, );
    this.game.cardsField.element.innerHTML = '';
    const index = categoryCard.findIndex((item) => item === link);
    if (index === 0) {
      this.currentCards = this.makeCategoryObj();
      this.newGame();
    } else {
      this.currentCards = wordCarts[index - 1];
      this.newGame();
    }

    this.addRemoveStartGameBtn(true);
  }

  addRemoveStartGameBtn(mode = true) {
    if (mode === this.currentMode) return;
    if (this.currentCards[1].translation !== IT_IS_CATEGORY) {
      this.startGameBtn.innerText = 'Start';
      this.startGameBtn.classList.remove('repeat');
      this.startGameBtn.removeEventListener('click', eventFunc);
      this.startGameBtn.addEventListener('click', this.startGameBtnHandter.bind(this), { once: true });
      this.currentMode = mode;
    }
    if (!mode) {
      this.element.append(this.startGameBtn);
    } else if (this.startGameBtn.parentNode) this.startGameBtn.parentNode.removeChild(this.startGameBtn);
  }

  startGameBtnHandter() {
    // console.log('startGameBtnHandter');
    // if (this.gameBegin) {
    //
    //   return;
    // }

    this.gameBegin = true;

    this.startGameBtn.addEventListener('click', eventFunc);
    this.startGameBtn.classList.add('repeat');
    this.startGameBtn.innerHTML = '&#x21bb';
  }

  tempMethod() {
    console.log('нужно повторить слово', this);
  }
}
