import { Game } from './module/game';
import { categoryCard, wordCarts } from './data/data';
import { Header } from './components/header';
import { IT_IS_CATEGORY } from './data/constants';
import store from './store/store';
import { CartInterface } from './models/CartInterface';
import { BaseComponent } from './components/base-component';
import './components/app.scss';
import { LogicGame } from './module/logic-game';

let eventFunc:()=>void;

export class App {
  private element: HTMLBodyElement;

  private currentLink: string;

  private currentCards: CartInterface[];

  private startGameBtn: HTMLElement = new BaseComponent('div', ['start-game-btn']).element;

  private currentMode: boolean;

  private gameBegin: boolean|undefined;

  private logicGame: LogicGame|undefined;

  private game: Game|undefined;

  constructor(rootElement: HTMLBodyElement) {
    eventFunc = this.tempMethod.bind(this);
    this.startGameBtn = new BaseComponent('div', ['start-game-btn']).element;

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
    this.newGame();
  }

  newGame() {
    console.log('новое поле');
    this.game = new Game();
    this.element.append(this.game.cardsField.element);
    this.game.newGame(this.currentCards);
    this.addRemoveStartGameBtn();
  }

  makeCategoryObj = () => {
    const tempCategoryCard = categoryCard.filter((item, index, arr) => index !== 0 && index !== arr.length - 1);
    return tempCategoryCard.map((item, index) => ({
      word: item, translation: IT_IS_CATEGORY, image: wordCarts[index][1].image, audioSrc: '',
    }));
  };

  stateHandler(link: string) {
    if (link === this.currentLink) return;
    if (!this.game) return;
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
    if (!this.game) return;
    if (!this.game.cards) return;

    this.logicGame = new LogicGame(this.game.cards, this.game.cardsField.element);
    this.gameBegin = true;

    this.startGameBtn.addEventListener('click', eventFunc);
    this.startGameBtn.classList.add('repeat');
    this.startGameBtn.innerHTML = '&#x21bb';
    this.startGame();
  }

  tempMethod = () => {
    console.log('нужно повторить слово');
  };

  startGame() {
    this.logicGame?.startGame();
  }
}
