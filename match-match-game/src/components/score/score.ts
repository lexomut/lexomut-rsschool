import { BaseComponent } from '../base-component';
import { IDB } from '../indexeDB/indexeDB';
import appState from '../appState/appState';
import './score.scss';

export class Score extends BaseComponent {
  constructor() {
    super('div', ['score']);
  }

  async getScore() {
    this.element.innerHTML = '';
    const db = new IDB();
    await setTimeout(() => {
      db.loadAll((arg:[]) => {
        appState.score = arg;
      });
    }, 0);

    console.log(appState.score);
    setTimeout(() => {
      console.log(appState.score);
      appState.score.sort((b, a) => a.score - b.score);
      console.log(appState.score);
      for (let i = 0; i < 10 && i < appState.score.length; i++) {
        const row = new BaseComponent('div', ['row']).element;
        row.innerHTML = `<div>${i + 1}</div><div>${appState.score[i].name || '-------------------'} ${appState.score[i].name || '-------------------'}</div> <div>${appState.score[i].score || '-------'}</div> `;
        this.element.append(row);
      }
    }, 1000);
  }
}
