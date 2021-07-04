import { App } from './app';
import './footer.scss';

window.onload = () => {
  const appElement = document.querySelector('body');
  if (!appElement) throw Error('App root element not found');
  const app = new App(appElement);
  app.element.insertAdjacentHTML('afterend', ''
    + '<div class="footer" ><a href="https://rs.school/js/"> <img src="svg/rs_school_js.svg" alt="rs.school"> </a></div>');
};
