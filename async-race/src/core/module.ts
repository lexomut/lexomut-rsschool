import { ComponentInt, ModuleConfig } from './componentConfig';
import { AppComponent } from '../app/app.component';
import { router } from '../tools/router';
import { tabsPageComponent } from '../app/pages/tabs-page';
import garageRender from '../app/cars/field';
import appState from '../app/app-state';

export class Module {
  private components: { render: () => void }[];

  private bootComponent: { render: () => void };

  private routes: { path: string; component: ComponentInt; }[];

  constructor(config:ModuleConfig) {
    this.components = config.components;
    this.bootComponent = config.boot;
    this.routes = config.routes;
  }

  start() {
    this.initComponents();
    console.log('2');

    if (this.routes) this.initRoutes();
  }

  initComponents() {
    console.log('3');
    this.bootComponent.render();
    this.components.forEach(this.renderComponent.bind(this));
  }

  initRoutes() {
    this.renderRoute();
    window.addEventListener('hashchange', this.renderRoute.bind(this));
  }

  async renderRoute() {
    console.log('5');
    const url:string = router.getUrl();
    const route = this.routes.find((r) => r.path === url) || this.routes[2];

    const elem = document.querySelector('.header');
    if (elem) {
      if (!elem.nextElementSibling) elem.insertAdjacentHTML('afterend', `<${route.component.selector}></${route.component.selector}>`);
      else elem.nextElementSibling.innerHTML = `<${route.component.selector}></${route.component.selector}>`;
    }
    this.renderComponent(route.component);
    appState.field = await garageRender();
    elem?.insertAdjacentHTML('afterend', appState.field);
  }

  renderComponent = (c:{ render: () => void }) => {
    console.log('4');
    c.render();
  };
}
