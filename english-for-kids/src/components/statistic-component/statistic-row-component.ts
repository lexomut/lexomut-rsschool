import { BaseComponent } from '../base-component';
import { Word } from '../../module/statistic';
import './statistic.scss';

export class StatisticRowComponent extends BaseComponent {
  constructor(config:Word) {
    super('ul', ['statistic-row']);
    this.element.innerHTML = `
    <li class="statistic__elem word">${config.word}</li>
    <li class="statistic__elem translate" >${config.translate}</li>
    <li class="statistic__elem category" >${config.category}</li>
    <li class="statistic__elem train-click " >${config.trainClickCounterInTrainmode}</li>
    <li class="statistic__elem right-Click" >${config.rightClickCounter}</li>
    <li class="statistic__elem incorrect-click" >${config.incorrectClickCounter}</li>
    <li class="statistic__elem  ratio">${config.ratio}</li>
    `;
  }
}
