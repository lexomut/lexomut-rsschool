import { BaseComponent } from '../base-component';
import { StatisticHeaderComponent } from './statistic-header-component';
import { statistic } from '../../module/statistic';
import { StatisticRowComponent } from './statistic-row-component';
import './statistic.scss';

export class StatisticComponent extends BaseComponent {
  private header: HTMLElement;

  private statisticField: HTMLElement;

  constructor() {
    super('div', ['statistic']);
    this.header = new StatisticHeaderComponent().element;
    this.header.addEventListener('click', (e) => this.headerHandler(e));
    this.element.append(this.header);
    this.statisticField = new BaseComponent('div', ['statistic-field']).element;
    this.newStatistic();
    this.element.append(this.statisticField);
  }

  headerHandler(event:MouseEvent) {
    if (event.target) {
      if (event.target instanceof HTMLElement) {
        if (event.target.classList.contains('statistic__header-name')) {
          if (event.target.dataset.sort) {
            if (event.target.dataset.isNuber) statistic.sort(event.target.dataset.sort, true);
            else statistic.sort(event.target.dataset.sort, false);
          }
        }
      }
    }
    this.newStatistic();
  }

  newStatistic() {
    this.statisticField.innerHTML = '';
    statistic.words.forEach((word) => { this.statisticField.append(new StatisticRowComponent(word).element); });
  }
}
