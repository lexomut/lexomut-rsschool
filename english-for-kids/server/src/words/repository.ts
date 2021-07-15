import { categories, words } from '../data';
import { WordInterface } from '../models';

export function deleteWord(indexOfCategory:number, index:number): Promise<string> {
  if (indexOfCategory < 0 || indexOfCategory > words.length) return Promise.reject(new Error('can not fined category'));
  const category = words[indexOfCategory];
  if (index < 0 || index >= category.length) return Promise.reject(new Error(`can not fined word with index ${index} of ${category.length}`));
  const deletedWord = category[index].word;
  category.splice(index, 1);
  return Promise.resolve(`deleted word --  ${deletedWord}`);
}

export function createEmptyWord(indexOfCategory:number): Promise<string> {
  words[indexOfCategory].push({
    word: '',
    translation: '',
    image: 'img/undefined.jpg',
    audioSrc: '',
  });
  return Promise.resolve(`create new word in category with index ${indexOfCategory}  `);
}

export function replaceWord(indexOfCategory:number, indexWord:number, object:WordInterface): Promise<string> {
  const olgWord = words[indexOfCategory][indexWord].word;
  words[indexOfCategory][indexWord] = object;
  const newWord = words[indexOfCategory][indexWord].word;

  return Promise.resolve(`old word ${olgWord} replace new word ${newWord}  in category with index ${indexOfCategory}  `);
}

