import ts, { idText } from 'typescript/lib/tsserverlibrary';
import { categories, words } from './data';
import { WordInterface } from './models';
import emptyArray = ts.server.emptyArray;

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

export function getWordsByIndex(index:number):Promise<WordInterface[]> {
  if (index < 0 || index >= words.length) return Promise.reject(new Error(`can not fined category with index ${index} of ${words.length}`));
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

export function deleteCategory(index: number): Promise<void> {
  if (index < 0 || index > words.length) return Promise.reject(new Error('can not fined words'));
  if (index < 0 || index >= categories.length) return Promise.reject(new Error('can not fined category'));
  categories.splice(index, 1);
  words.splice(index, 1);
  return Promise.resolve();
}

export function createCategory(category: string): Promise<string> {
  const isExist = typeof categories.find((cat) => cat.toLowerCase() === category.toLowerCase()) !== 'undefined';
  if (category !== 'empty') {
    if (isExist) {
      return Promise.reject(new Error(`Category with name ${category} is already exists`));
    }
  }
  categories.push(category);
  words.push([]);
  return Promise.resolve(category);
}

export function deleteEmptyCategory(): Promise<void> {
  const newCategories:string[] = categories.filter((item) => item !== 'empty');
  console.log(newCategories);
  categories.splice(0, categories.length);
  newCategories.forEach((item) => categories.push(item));
  console.log(categories);

  return Promise.resolve();
}
