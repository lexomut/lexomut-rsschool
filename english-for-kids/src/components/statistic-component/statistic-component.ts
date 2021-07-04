import { BaseComponent } from '../base-component';
import { StatisticHeaderComponent } from './statistic-header-component';
import { statistic } from '../../module/statistic';
import { StatisticRowComponent } from './statistic-row-component';
import './statistic.scss';
import { StatisticBtn } from './statistic-btn-component';

export class StatisticComponent extends BaseComponent {
  private readonly header: HTMLElement;

  private readonly statisticField: HTMLElement;

  private statisticBtn: StatisticBtn;

  constructor() {
    super('div', ['statistic']);
    this.statisticBtn = new StatisticBtn();
    this.element.append(this.statisticBtn.element);
    this.statisticBtn.reset.addEventListener('click', () => { statistic.reset(); this.newStatistic(); });
    this.header = new StatisticHeaderComponent().element;
    this.header.addEventListener('click', (e) => this.headerHandler(e));
    this.element.append(this.header);
    this.statisticField = new BaseComponent('div', ['statistic-field']).element;
    this.newStatistic();
    this.element.append(this.statisticField);
  }

  headerHandler(event:MouseEvent):void {
    if (event.target) {
      if (event.target instanceof HTMLElement) {
        if (event.target.classList.contains('statistic__header-name')) {
          if (event.target.dataset.sort && event.target.dataset.arrow) {
            if (event.target.dataset.isNuber) {
              statistic.sort(event.target.dataset.sort, true, +event.target.dataset.arrow);
            } else statistic.sort(event.target.dataset.sort, false, +event.target.dataset.arrow);
            event.target.dataset.arrow = `${(+event.target.dataset.arrow) * -1}`;
          }
        }
      }
    }
    this.newStatistic();
  }

  newStatistic():void {
    this.statisticField.innerHTML = '';
    statistic.words.forEach((word) => {
      word.ratio = Math.floor((word.incorrectClickCounter / (word.rightClickCounter + word.incorrectClickCounter))
        * 100) || 0;
      this.statisticField.append(new StatisticRowComponent(word).element);
    });
  }
}
