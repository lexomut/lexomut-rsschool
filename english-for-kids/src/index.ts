import { App } from './app';
import './footer.scss';
import store from './store/store';
import { Login } from './components/login/login';
import { AdminPage } from './components/admin-page/admin-page';
import { checkAuth, deleteEmptyCategoryRequest } from './module/request';
import { getLocation } from './components/admin-page/functions';

function login(rootElement:HTMLElement) {
  const loginForm = new Login(rootElement);
  // eslint-disable-next-line @typescript-eslint/no-use-before-define
  loginForm.authorization().then(() => adminPage(rootElement), (e) => {
    if (!e) login(rootElement);
  });
}

async function mainPage() {
  await deleteEmptyCategoryRequest();
  const appElement = document.querySelector('body');
  if (!appElement) throw Error('App root element not found');
  if (appElement.nextElementSibling) appElement.nextElementSibling.innerHTML = '';

  if (getLocation()[0] === 'categories') {
    await checkAuth().then(() => {
      // eslint-disable-next-line @typescript-eslint/no-use-before-define
      adminPage(appElement);
    }, (e) => { window.history.pushState(null, '', '/'); alert(e); });
  }

  const app = new App(appElement);
  app.element.insertAdjacentHTML('afterend', ''
    + '<div class="footer" ><a href="https://rs.school/js/"> '
    + '<img src="svg/rs_school_js.svg" alt="rs.school"> </a>'
    + '<H2>2021</H2>'
    + '<a href="https://github.com/lexomut"> '
    + '<img src="svg/git.png" alt="rs.school"> </a></div>');
  const unsubscribe = store.subscribe(() => {
    if (store.getState().link === 'Login') {
      // unsubscribe();
      login(appElement);
    }
  });
}
async function adminPage(rootElement:HTMLElement) {
  await new AdminPage(rootElement).render();
  rootElement.innerHTML = '';

  mainPage();
}

window.onload = () => {
  mainPage();
  console.log('index.ts запустился');
};
