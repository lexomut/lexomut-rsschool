import { Interfaces } from '../models/Interfaces';
import state from '../state';
import store from '../store/store';
import { Word } from './word';

export class Statistic {
  words: Word[];

  constructor() {
    this.words = [];
    state.wordCarts.forEach((arr, index) => arr.forEach((item) => this.words.push(new Word(item, state.categoryCard[index + 1]))));
    if (localStorage.getItem('statistic')) {
      const json = localStorage.getItem('statistic');
      if (json) this.words = JSON.parse(json);
    }
    store.subscribe(() => localStorage.setItem('statistic', JSON.stringify(this.words)));
  }

  trainClick(word:string):void {
    if (!this.words[this.find(word)]) this.reset();
    this.words[this.find(word)].trainClickCounterInTrainmode++;
  }

  incorrectClick(word:string):void {
    if (!this.words[this.find(word)]) this.reset();
    this.words[this.find(word)].incorrectClickCounter++;
  }

  rightClick(word:string):void {
    if (!this.words[this.find(word)]) this.reset();
    this.words[this.find(word)].rightClickCounter++;
  }

  find(word:string):number {
    return this.words.findIndex((item) => item.word === word);
  }

  reset():void {
    localStorage.setItem('statistic', '');
    this.words = [];
    state.wordCarts.forEach((arr, index) => arr.forEach((item) => this.words.push(new Word(item, state.categoryCard[index + 1]))));
    localStorage.setItem('statistic', JSON.stringify(this.words));
  }

  sort(field:string, isNumber:boolean, arrow:number):void {
    if (isNumber) this.words.sort((a:any, b:any) => (a[field] - b[field]) * arrow);
    else {
      this.words.sort((a:any, b:any) => {
        const nameA = a[field].toLowerCase();
        const nameB = b[field].toLowerCase();
        if (nameA < nameB) return -1 * arrow;
        if (nameA > nameB) return 1 * arrow;
        return 0;
      });
    }
  }

  makelistHigthPercentError():Interfaces[] {
    this.sort('ratio', true, -1);
    const words:string[] = [];
    this.words.forEach((word, index) => { if (index < 7 && word.ratio > 0) words.push(word.word); });
    const cards:Interfaces[] = [];
    state.wordCarts.forEach((arr :Interfaces[]) => arr.forEach((card:Interfaces) => {
      if (words.find((item) => item === card.word)) { cards.push(card); }
    }));
    return cards;
  }
}

export const statistic = new Statistic();
