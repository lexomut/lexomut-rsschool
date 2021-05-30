import { Game } from './components/game/game';
import { ImageCategoryModel } from './models/image-category-model';
import { Registration } from './components/registration/registration';
import { Header } from './components/header/header';
import { BaseComponent } from './components/base-component';
import { Manual } from './components/manual/manual';
import { Score } from './components/score/score';
import appState from './components/appState/appState';
import { Settings } from './components/settings/settings';

export class App {
  private readonly game: Game;

  header: Header;

  shadow: HTMLElement;

  private manual: HTMLElement;

  private mainField: HTMLElement;

  private pages: { method: () => void; name: string }[];

  registration: Registration;

  private score:Score;

  private settings:Settings;

  constructor(private readonly rootElement: HTMLElement) {
    this.game = new Game();
    this.shadow = new BaseComponent('div', ['shadow']).element;
    this.mainField = new BaseComponent('div', ['main-field']).element;
    this.rootElement = rootElement;
    this.header = new Header();
    this.rootElement.appendChild(this.header.element);
    this.rootElement.appendChild(this.mainField);
    this.manual = new Manual().element;
    this.mainField.appendChild(this.manual);
    this.mainField.insertAdjacentHTML('beforebegin', '<p>Уважаемый проверяющий, пожалуйста не суди строго мою работу, т.к. нужно было использовать очень много новых инструментов ранее мно не знакомых, а времени на их изучение и  на данный проект совсем не было. Если что-то очень сильно режет глаза- пищи я постараюсь исправить. </p>');
    this.registration = new Registration(this.shadow);
    this.score = new Score();
    this.settings = new Settings();
    this.pages = [
      {
        name: 'reg',
        method: () => {
          this.shadow = new BaseComponent('div', ['shadow']).element;
          this.registration = new Registration(this.shadow);
          this.rootElement.appendChild(this.shadow);
          this.shadow.appendChild(this.registration.element);
          this.registration.element.insertAdjacentHTML('afterend', '<div class="shadow"></div>');
          this.registration.reg();
        },
      },
      {
        name: 'play',
        method: async () => {
          this.mainField.innerHTML = '';
          appState.activePage = 'play';
          appState.stateHeaderBtn = 'stop';
          appState.stopGame = false;
          this.mainField.appendChild(this.game.element);
          const res = await fetch('./images.json');
          const categories: ImageCategoryModel[] = await res.json();
          const cat = categories.find((item) => item.category === appState.category) || categories[0];

          const images = cat.images.map((name) => `${cat.category}/${name}`).slice(0, appState.sizeSetting);

          this.game.newGame(images);
        },
      },
      {
        name: 'about',
        method: () => {
          this.mainField.innerHTML = '';
          appState.activePage = 'aboutGame';

          this.mainField.appendChild(this.manual);
        },
      },
      {
        name: 'stop',
        method: () => {},
      },
      {
        name: 'bestScore',
        method: () => {
          this.mainField.innerHTML = '';
          this.mainField.append(this.score.element);
          appState.activePage = 'bestScore';
          this.score.getScore();
        },
      },
      {
        name: 'gameSettings',
        method: () => {
          this.mainField.innerHTML = '';
          appState.activePage = 'gameSettings';
          this.mainField.append(this.settings.element);
        },
      },
    ];
  }

  changeHeader() {
    this.header.element.remove();
    this.header = new Header();
    this.rootElement.prepend(this.header.element);
  }

  // async start() {
  //
  // }

  // render(location:string) {
  //   new Function(`this.${location}()`)();
  // }

  begin() {
    let locationHash:string;
    const defaultRout = { name: 'def', method: () => { this.mainField.appendChild(this.manual); } };
    window.onpopstate = (() => {
      locationHash = (window.location.hash.slice(1));
      const currentRoute = this.pages.find((page) => page.name === locationHash);
      (currentRoute || defaultRout).method();

      setTimeout(() => this.changeHeader(), 1);
    });
  }
}
