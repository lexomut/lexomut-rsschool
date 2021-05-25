import './style.scss';
import { App } from './app';

window.onload = () => {
  const appElement = document.getElementById('app');
  if (!appElement) throw Error('App root element not found');
  const app = new App(appElement);
  app.reg();

};
