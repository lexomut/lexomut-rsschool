import { Game } from './components/game/game';
import { ImageCategoryModel } from './models/image-category-model';
import { Registration } from './components/registration/registration';

export class App {
  private readonly game: Game;
  private readonly registration: Registration;
  constructor(private readonly rootElement: HTMLElement) {
    this.game = new Game();
    this.registration = new Registration();
   this.rootElement = rootElement;
  }

   reg() {
    this.rootElement.appendChild(this.registration.element);
    setTimeout(() => {
      this.start();
    }, 2000);
  }

  async start() {
    this.rootElement.innerHTML = '';
    this.rootElement.appendChild(this.game.element);
    const res = await fetch('./images.json');
    const categories: ImageCategoryModel[] = await res.json();
    const cat = categories[0];
    const images = cat.images.map((name) => `${cat.category}/${name}`);
    this.game.newGame(images);
  }
}
