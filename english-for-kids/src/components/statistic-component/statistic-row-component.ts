import { BaseComponent } from '../base-component';
import { Word } from '../../module/statistic';
import './statistic.scss';

export class StatisticRowComponent extends BaseComponent {
  constructor(config:Word) {
    super('div', ['statistic-row']);
    this.element.innerHTML = `
    <div class="statistic__elem word">${config.word}</div>
    <div class="statistic__elem translate" >${config.translate}</div>
    <div class="statistic__elem category" >${config.category}</div>
    <div class="statistic__elem train-click "data-is-nuber="true"  >${config.trainClickCounterInTrainmode}</div>
    <div class="statistic__elem right-Click" data-is-nuber="true" >${config.rightClickCounter}</div>
    <div class="statistic__elem incorrect-click"data-is-nuber="true"  >${config.incorrectClickCounter}</div>
    <div class="statistic__elem  ratio" data-is-nuber="true" >${config.ratio}</div>
    `;
  }
}
