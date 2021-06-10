import { ComponentInt, ModuleConfig } from './componentConfig';
import { AppComponent } from '../app/app.component';
import { router } from '../tools/router';
import { tabsPageComponent } from '../app/pages/tabs-page';

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

    if (this.routes) this.initRoutes();
  }

  initComponents() {
    this.bootComponent.render();
    this.components.forEach(this.renderComponent.bind(this));
  }

  initRoutes() {
    this.renderRoute();
    window.addEventListener('hashchange', this.renderRoute.bind(this));
  }

  renderRoute() {
    const url:string = router.getUrl();
    const route = this.routes.find((r) => r.path === url) || this.routes[2];

    const elem = document.querySelector('.header');
    if (elem) {
      if (!elem.nextElementSibling) elem.insertAdjacentHTML('afterend', `<${route.component.selector}></${route.component.selector}>`);
      else elem.nextElementSibling.innerHTML = `<${route.component.selector}></${route.component.selector}>`;
    }
    this.renderComponent(route.component);
  }

  renderComponent = (c:{ render: () => void }) => {
    c.render();
  };
}
