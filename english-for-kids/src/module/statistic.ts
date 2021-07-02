// eslint-disable-next-line max-classes-per-file
import { categoryCard, wordCarts } from '../data/data';
import { CartInterface } from '../models/CartInterface';


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
    this.ratio = ((this.rightClickCounter + this.incorrectClickCounter) / this.rightClickCounter) * 100;
  }
}

export class Statistic {
 words: Word[];

  constructor() {
    this.words = [];
    wordCarts.forEach((arr, index) => arr.forEach((item) => this.words.push(new Word(item, categoryCard[index]))));
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
    wordCarts.forEach((arr, index) => arr.forEach((item) => this.words.push(new Word(item, categoryCard[index]))));
  }

  sort(field:string, isNumber:boolean) {
    if (isNumber) this.words.sort((a:any, b:any) => a[field] - b[field]);
    else {
      this.words.sort((a:any, b:any) => {
        const nameA = a[field].toLowerCase();
        const nameB = b[field].toLowerCase();
        if (nameA < nameB) return -1;
        if (nameA > nameB) return 1;
        return 0;
      });
    }
  }
}

export const statistic = new Statistic();
