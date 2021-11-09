import { BaseComponent } from '../base-component';
import { dispatchMouseClickOnMenu } from '../../store/actions';
import './statistic.scss';

export class StatisticBtn extends BaseComponent {
  private readonly RepeatDifficultWordsBtn: HTMLElement;

  reset: HTMLElement;

  constructor() {
    super('div', ['statistic-btn-block']);
    this.RepeatDifficultWordsBtn = new BaseComponent('button', ['statistic-btn']).element;
    this.reset = new BaseComponent('div', ['statistic-btn']).element;
    this.RepeatDifficultWordsBtn.innerText = 'Repeat difficult item';
    this.reset.innerText = 'Reset';
    this.RepeatDifficultWordsBtn.addEventListener('click', () => {
      dispatchMouseClickOnMenu('listHigthPercentError');
    }, { once: true });
    this.element.append(this.RepeatDifficultWordsBtn);
    this.element.append(this.reset);
  }
}
