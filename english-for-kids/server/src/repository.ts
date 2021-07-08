import { categories, words } from './data';
import { WordInterface } from './models';

export function getCategories():Promise<string[]> {
  return Promise.resolve(categories);
}
export function getAllWords():Promise<WordInterface[][]> {
  return Promise.resolve(words);
}

export function getWordsByCategoryName(nameCategory:string):Promise<WordInterface[]> {
  const index = categories.findIndex((item) => nameCategory === item);
  if (index < 0) return Promise.reject(new Error('can not fined category'));
  return Promise.resolve(words[index]);
}
export function getWordByName(nameWord:string):Promise<WordInterface> {
  let word:WordInterface|undefined;
  words.forEach((arr:WordInterface[]) => {
    arr.forEach((item:WordInterface) => {
      if (item.word === nameWord) word = item;
    });
  });
  if (word) return Promise.resolve(word);
  return Promise.reject(new Error('can not fined word'));
}
