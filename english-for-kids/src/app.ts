import { Game } from './module/game';
import { categoryCard, wordCarts } from './data/data';
import { Header } from './components/header';
import { IT_IS_CATEGORY } from './data/constants';
import store from './store/store';
import { CartInterface } from './models/CartInterface';
import { BaseComponent } from './components/base-component';
import './components/app.scss';
import { LogicGame } from './module/logic-game';
import { dispatchMouseClickOnMenu } from './store/actions';
import { StatisticComponent } from './components/statistic-component/statistic-component';
import { statistic } from './module/statistic';

let eventFunc:()=>void;

export class App {
  element: HTMLBodyElement;

  private currentLink: string;

  private currentCards: CartInterface[];

  private readonly startGameBtn: HTMLElement = new BaseComponent('div', ['start-game-btn']).element;

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
      this.gameBegin = false;
      this.modeChangeHandler(store.getState().mode);
    });
    this.gameBegin = false;

    this.newGame();
  }

  async newGame():Promise<void> {
    this.game = new Game();
    this.element.append(this.game.cardsField.element);
    await this.game.newGame(this.currentCards);
    this.addRemoveStartGameBtn(this.currentMode);
  }

  makeCategoryObj = ():CartInterface[] => {
    const tempCategoryCard = categoryCard.filter((item, index, arr) => index !== 0 && index !== arr.length - 1);
    return tempCategoryCard.map((item, index) => ({
      word: item, translation: IT_IS_CATEGORY, image: wordCarts[index][1].image, audioSrc: '',
    }));
  };

  modeChangeHandler(mode:boolean):void {
    if (mode === this.currentMode) { return; }
    this.addRemoveStartGameBtn(mode);
    // if (this.game) {
    //   this.element.removeChild(this.game.cardsField.element);

    // }
    // this.newGame();
    this.addRemoveStartGameBtn(mode);
    this.currentMode = mode;
  }

  stateHandler(link: string):void {
    if (link === this.currentLink) return;
    if (!this.game) return;
    this.currentLink = link;

    this.game.cardsField.element.innerHTML = '';
    if (link === 'listHigthPercentError') {
      this.currentCards = statistic.makelistHigthPercentError();
      this.newGame();
      return;
    }
    const index = categoryCard.findIndex((item) => item === link);
    if (index === 0) {
      this.currentCards = this.makeCategoryObj();
      this.newGame();
    } else if (index === categoryCard.length - 1) {
      this.game.cardsField.element.append(new StatisticComponent().element);
      this.addRemoveStartGameBtn(false);
    } else {
      this.currentCards = wordCarts[index - 1];
      this.newGame();
    }
  }

  addRemoveStartGameBtn(mode = true):void {
    this.startGameBtn.innerText = 'Start';
    this.startGameBtn.classList.remove('repeat');
    this.startGameBtn.removeEventListener('click', eventFunc);

    if (!mode && this.currentCards[1].translation !== IT_IS_CATEGORY && this.currentLink !== 'statistic') {
      this.element.append(this.startGameBtn);
      this.startGameBtn.onclick = this.startGameBtnHandter.bind(this);
    } else if (this.startGameBtn.parentNode) this.startGameBtn.parentNode.removeChild(this.startGameBtn);
  }

  startGameBtnHandter():void {
    if (!this.game) return;
    if (!this.game.cards) return;

    this.gameBegin = true;

    this.startGameBtn.addEventListener('click', eventFunc);
    this.startGameBtn.classList.add('repeat');
    this.startGameBtn.innerHTML = '&#x21bb';
    this.logicGame = new LogicGame(this.game.cards, this.game.cardsField);
    this.startGame();
  }

  tempMethod = ():void => {
    if (this.logicGame) this.logicGame.currentCard.playSound(this.logicGame.currentCard.audioSrc);
  };

  async startGame():Promise<void> {
    this.startGameBtn.onclick = null;

    await this.logicGame?.startGame().then(() => {
      dispatchMouseClickOnMenu('Home');
    });
  }
}
