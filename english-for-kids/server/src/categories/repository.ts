import ts, { idText } from 'typescript/lib/tsserverlibrary';
import { categories, words } from '../data';
import { WordInterface } from '../models';
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
  return Promise.reject(new Error('can not fined item'));
}

export function deleteCategory(index: number): Promise<void> {
  if (index < 0 || index > words.length) return Promise.reject(new Error('can not fined item'));
  if (index < 0 || index >= categories.length) return Promise.reject(new Error('can not fined category'));
  categories.splice(index, 1);
  words.splice(index, 1);
  return Promise.resolve();
}

export function createCategory(category: string): Promise<string> {
  const isExist = (typeof categories.find((cat) => cat.toLowerCase() === category.toLowerCase())) !== 'undefined';
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
  function del() {
    const amoutEmpty = categories.filter((item) => item === 'empty').length;
    if (!amoutEmpty) return;
    const index:number = categories.findIndex((item) => item === 'empty');
    words.splice(index, 1);
    categories.splice(index, 1);
    del();
  }
  del();

  return Promise.resolve();
}

export function renameCategory(newNameCategory:string, index:number): Promise<string> {
  const isExist = (typeof categories.find((cat) => cat.toLowerCase() === newNameCategory.toLowerCase())) !== 'undefined';
  if (isExist) {
    return Promise.reject(new Error(`Category with name ${newNameCategory} is already exists`));
  }
  if (!categories[index]) return Promise.reject(new Error(`Category with index ${index} not exists`));
  categories[index] = newNameCategory;
  words[index] = [{
    word: newNameCategory,
    translation: 'проверка',
    image: 'img/success.jpg',
    audioSrc: 'audio/success.mp3',
  }, {
    word: newNameCategory,
    translation: 'проверка',
    image: 'img/success.jpg',
    audioSrc: 'audio/success.mp3',
  }];
  return Promise.resolve(`categiry with index ${index} rename at ${newNameCategory}`);
}
