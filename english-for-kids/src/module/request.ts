import { Interfaces, RequestApiConfig } from '../models/Interfaces';

export function requestFunction(config:RequestApiConfig):Promise<any> {
  return new Promise((resolve, reject) => {
    fetch(config.url, config.fetchConfig)
      .then((response) => {
        console.log(response.status);
        // eslint-disable-next-line
        if (!response.ok) throw response;
        return response.json();
      })
      .then((json) => resolve(json))
      .catch((err) => {
        console.log('принята ошибка', err);
        err.text().then((errorMessage:string) => reject(errorMessage));
      });
  });
}

export async function getCategories():Promise<string[]> {
  let json;
  const response = await fetch('http://localhost:3000/api/categories/');
  if (response.ok) {
    json = await response.json();
  } else {
    console.log(`Ошибка HTTP: ${response.status}`);
  }

  return json;
}

export async function getWordsOfCategoryByIndex(index:number):Promise<Interfaces[]> {
  if (Number.isNaN(index)) return Promise.reject(new Error('index is NAN'));
  let json;
  const response = await fetch(`http://localhost:3000/api/categories/${index}`);
  if (response.ok) {
    json = await response.json();
    // console.log(response);
  } else {
    console.log(`Ошибка HTTP: ${response.status}`);
  }
  // console.log(json);
  return json;
}

export async function deleteCategory(index:number):Promise<string> {
  let json;
  const response = await fetch(`http://localhost:3000/api/categories/${index}`, { method: 'DELETE' });
  return response.status.toString();
}

export async function deleteEmptyCategoryRequest():Promise<string> {
  let json;
  const response = await fetch('http://localhost:3000/api/categories/', { method: 'DELETE' });
  return response.status.toString();
}

export async function createCategory(categoryName:string):Promise<unknown> {
  const response = await fetch('http://localhost:3000/api/categories/', {
    method: 'POST',
    headers: { 'Content-Type': 'text/plain;charset=UTF-8' },
    body: `${categoryName}`,
  });
  return response.json();
}

export async function deleteWord(categoryName:string, index:number) {
  const config = {
    url: `http://localhost:3000/api/words/${categoryName}/${index}`,
    fetchConfig: {
      method: 'DELETE',
    },
  };
  await requestFunction(config);
}

export async function renameCategory(categoryName:string, index:number) {
  const config = {
    url: `http://localhost:3000/api/categories/${index}`,
    fetchConfig:
        {
          method: 'POST',
          headers: { 'Content-Type': 'text/plain;charset=UTF-8' },
          body: `${categoryName}`,
        },
  };
  await requestFunction(config);
}

export async function getWords():Promise<Interfaces[][]> {
  const config = {
    url: 'http://localhost:3000/api/categories/all',
    fetchConfig:
      {
        method: 'GET',
      },
  };
  const result = await requestFunction(config);
  return result;
}

export async function createEmptyWord(categoryName:string) {
  const config = {
    url: `http://localhost:3000/api/words/${categoryName}`,
    fetchConfig:
      {
        method: 'POST',
      },
  };
  await requestFunction(config);
}

export async function replaceWord(categoryName:string, index:number, word:Interfaces) {
  const config = {
    url: `http://localhost:3000/api/words/rename/${categoryName}/${index}`,
    fetchConfig: {
      method: 'POST',
      headers: { 'Content-Type': 'text/plain;charset=UTF-8' },
      body: `${JSON.stringify(word)}`,
    },
  };
  console.log(JSON.stringify(word).toString());
  await requestFunction(config);
}

export async function upload(categoryName:string, index:number, formdata:FormData) {
  console.log('upload');
  const ctrl = new AbortController();
  const config = {
    url: `http://localhost:3000/api/words/upload/${categoryName}/${index}`,
    fetchConfig: {
      method: 'POST',
      body: formdata,
      signal: ctrl.signal,
    },
  };

  setTimeout(() => ctrl.abort(), 5000);

  await requestFunction(config);
}
