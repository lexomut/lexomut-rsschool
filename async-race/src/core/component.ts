import { ComponentConfig } from './componentConfig';
import { util } from '../tools/util';

export interface Events {
  [key:string]:string;
}

export class Component {
  template: string;

  selector: string;

  private el: Element | null;

  constructor(config: ComponentConfig) {
    this.template = config.template;
    this.selector = config.selector;
    this.el = null;
  }

  render() {
    this.el = document.querySelector(this.selector);
    if (!this.el) throw new Error(`КОМПОНЕНТ С СЕЛЕКТОРОМ ${this.selector} НЕ НАЙДЕН`);
    else this.el.innerHTML = this.template;
    this.initEvents();
  }

  initEvents() {
    const events:Events = this.events();
    if (events.qqqqqq === 'qqq') return;

    if (Array.isArray(events)) return;
    Object.keys(events).forEach((key:string) => {
      const listener = key.split(' ');

      const f = () => {
        // не знаю как затипизировать метод дочернего класса, все перепробовал,если знаете подскажите
        // @ts-ignore
        this[events[key]].call(this);
      };
      const el = this.el || document;

      (el.querySelector(listener[1]) || document)
        .addEventListener(listener[0], f.bind(this));
    });
  }

  events = ():Events => ({ qqqqqq: 'qqq' });
}
