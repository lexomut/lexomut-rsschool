import { BaseComponent } from '../base-component';

import './statistic.scss';

export class StatisticHeaderComponent extends BaseComponent {
  constructor() {
    super('div', ['statistic__header']);
    this.element.innerHTML = `
    <a class="statistic__header-name statistic__elem" data-arrow="1"  data-sort="word">Word</a>
    <a class="statistic__header-name statistic__elem" data-arrow="1"  data-sort="translate">Translation</a>
    <a class="statistic__header-name statistic__elem" data-arrow="1"  data-sort="category">Category</a>
    <a class="statistic__header-name statistic__elem" data-arrow="1"  data-is-nuber="true" data-sort="trainClickCounterInTrainmode">Clicks</a>
    <a class="statistic__header-name statistic__elem" data-arrow="1"  data-is-nuber="true" data-sort="rightClickCounter">Correct</a>
    <a class="statistic__header-name statistic__elem" data-arrow="1"  data-is-nuber="true" data-sort="incorrectClickCounter">Wrong</a>
    <a class="statistic__header-name statistic__elem" data-arrow="1"  data-is-nuber="true" data-sort="ratio">% Error</a>
    `;
  }
}
