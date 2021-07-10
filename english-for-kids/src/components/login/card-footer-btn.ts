import { BaseComponent } from '../base-component';

import './login.scss';

export interface CardFooterBtnInterface {
  styles:string;
  btnNames:string[]
  btnFuncs:{ (): void; }[];

}

export class CardFooterBtn extends BaseComponent {
  firstBtn: HTMLElement ;

  secondBtn: HTMLElement | undefined;

  constructor(config:CardFooterBtnInterface) {
    super('div', ['footer-btn']);
    this.element.classList.add(config.styles);
    this.firstBtn = new BaseComponent('button', ['card-footer-btn','first-btn']).element;
    this.firstBtn.innerText = `${config.btnNames[0]}`;
    this.firstBtn.addEventListener('click', config.btnFuncs[0]);
    this.element.append(this.firstBtn);
    if (config.btnFuncs[1]) {
      this.secondBtn = new BaseComponent('button', ['card-footer-btn','second-btn']).element;
      this.secondBtn.innerText = `${config.btnNames[1]}`;
      this.secondBtn.addEventListener('click', config.btnFuncs[1]);
      this.element.append(this.secondBtn);
    }
  }
}
