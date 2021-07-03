// eslint-disable-next-line max-classes-per-file
import { jsonStringifyReplacerSortKeys } from 'eslint-webpack-plugin/declarations/utils';
import { categoryCard, wordCarts } from '../data/data';
import { CartInterface } from '../models/CartInterface';
import store from '../store/store';

export class Word {
  word: string;

  translate: string;

  category: string;

  trainClickCounterInTrainmode: number;

  rightClickCounter: number;

  incorrectClickCounter: number;

  ratio: number;

  constructor(config:CartInterface, category:string) {
    this.word = config.word;
    this.translate = config.translation;
    this.category = category;
    this.trainClickCounterInTrainmode = 0;
    this.rightClickCounter = 0;
    this.incorrectClickCounter = 0;
    this.ratio = 0;
  }
}

export class Statistic {
  words: Word[];

  constructor() {
    this.words = [];
    wordCarts.forEach((arr, index) => arr.forEach((item) => this.words.push(new Word(item, categoryCard[index]))));
    if (localStorage.getItem('statistic')) {
      const json = localStorage.getItem('statistic');
      if (json) this.words = JSON.parse(json);
    }
    store.subscribe(() => localStorage.setItem('statistic', JSON.stringify(this.words)));
  }

  view() {
    console.log(this.words);
  }

  trainClick(word:string) {
    this.words[this.find(word)].trainClickCounterInTrainmode++;
  }

  incorrectClick(word:string) {
    this.words[this.find(word)].incorrectClickCounter++;
  }

  rightClick(word:string) {
    this.words[this.find(word)].rightClickCounter++;
  }

  find(word:string) {
    return this.words.findIndex((item) => item.word === word);
  }

  reset() {
    this.words = [];
    wordCarts.forEach((arr, index) => arr.forEach((item) => this.words.push(new Word(item, categoryCard[index]))));
    localStorage.setItem('statistic', JSON.stringify(this.words));
  }

  sort(field:string, isNumber:boolean, arrow:number) {
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

  makelistHigthPercentError() {
    this.sort('ratio', true, -1);
    const words:string[] = [];
    this.words.forEach((word, index) => { if (index < 7) words.push(word.word); });
    const cards:CartInterface[] = [];
    wordCarts.forEach((arr :CartInterface[]) => arr.forEach((card:CartInterface) => {
      if (words.find((item) => item === card.word)) { cards.push(card); }
    }));
    return cards;
  }
}

export const statistic = new Statistic();
