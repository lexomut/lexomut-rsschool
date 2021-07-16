import { Interfaces, RequestApiConfig } from '../models/Interfaces';
import loginHash from '../data/loginHash';

const BASE_URL = 'http://localhost:3000';
// const BASE_URL = 'http://185.233.2.125';
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
  const response = await fetch(`${BASE_URL}/api/categories/`);
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
  const response = await fetch(`${BASE_URL}/api/categories/${index}`);
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
  const response = await fetch(`http://127.0.0.1/api/categories/${index}`, { method: 'DELETE' });
  return response.status.toString();
}

export async function deleteEmptyCategoryRequest():Promise<string> {
  let json;
  const response = await fetch(`${BASE_URL}/api/categories/`, { method: 'DELETE' });
  return response.status.toString();
}

export async function createCategory(categoryName:string):Promise<unknown> {
  const response = await fetch(`${BASE_URL}/api/categories/`, {
    method: 'POST',
    headers: { 'Content-Type': 'text/plain;charset=UTF-8' },
    body: `${categoryName}`,
  });
  return response.json();
}

export async function deleteWord(categoryName:string, index:number) {
  const config = {
    url: `${BASE_URL}/api/words/${categoryName}/${index}`,
    fetchConfig: {
      method: 'DELETE',
    },
  };
  await requestFunction(config);
}

export async function renameCategory(categoryName:string, index:number) {
  const config = {
    url: `${BASE_URL}/api/categories/${index}`,
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
    url: `${BASE_URL}/api/categories/all`,
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
    url: `${BASE_URL}/api/words/${categoryName}`,
    fetchConfig:
      {
        method: 'POST',
      },
  };
  await requestFunction(config);
}

export async function replaceWord(categoryName:string, index:number, word:Interfaces) {
  const config = {
    url: `${BASE_URL}/api/words/rename/${categoryName}/${index}`,
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
    url: `${BASE_URL}/api/words/upload/${categoryName}/${index}`,
    fetchConfig: {
      method: 'POST',
      body: formdata,
      signal: ctrl.signal,
    },
  };

  setTimeout(() => ctrl.abort(), 5000);

  await requestFunction(config);
}

export async function sendLogin(login:string, pass:string) {
  const config = {
    url: `${BASE_URL}/api/login/`,
    fetchConfig: {
      method: 'POST',
      headers: { 'Content-Type': 'text/plain;charset=UTF-8' },
      body: `${JSON.stringify({ login, pass })}`,
    },
  };
  const result = await requestFunction(config);
  return result;
}

export async function logout() {
  const config = {
    url: `${BASE_URL}/api/login/`,
    fetchConfig: {
      method: 'DELETE',
      headers: { 'Content-Type': 'text/plain;charset=UTF-8', Authentication: `${localStorage.getItem('hash')}` },
    },
  };
 await requestFunction(config);

}

export async function checkAuth() {
  const config = {
    url: `${BASE_URL}/api/login/check`,
    fetchConfig: {
      method: 'GET',
      headers: { 'Content-Type': 'text/plain;charset=UTF-8', Authentication: `${localStorage.getItem('hash')}` },
    },
  };
  const result = await requestFunction(config);
  return result;
}
