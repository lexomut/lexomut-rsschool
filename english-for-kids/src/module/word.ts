import { Interfaces } from '../models/Interfaces';

export class Word {
  word: string;

  translate: string;

  category: string;

  trainClickCounterInTrainmode: number;

  rightClickCounter: number;

  incorrectClickCounter: number;

  ratio: number;

  constructor(config:Interfaces, category:string) {
    this.word = config.word;
    this.translate = config.translation;
    this.category = category;
    this.trainClickCounterInTrainmode = 0;
    this.rightClickCounter = 0;
    this.incorrectClickCounter = 0;
    this.ratio = 0;
  }
}
