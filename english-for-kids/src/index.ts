import { App } from './app';

window.onload = () => {
  const appElement = document.querySelector('body');
  if (!appElement) throw Error('App root element not found');
  const app = new App(appElement);
  app.newGame();
};
