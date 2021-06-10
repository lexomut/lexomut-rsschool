import { ComponentConfig } from './componentConfig';

export class Component {
  template: string;

 selector: string;

  private el: Element | null;

  constructor(config:ComponentConfig) {
    this.template = config.template;
    this.selector = config.selector;
    this.el = null;
  }

  render() {
    this.el = document.querySelector(this.selector);
    if (!this.el) throw new Error(`КОМПОНЕНТ С СЕЛЕКТОРОМ ${this.selector} НЕ НАЙДЕН`);
    else this.el.innerHTML = this.template;
  }
}
