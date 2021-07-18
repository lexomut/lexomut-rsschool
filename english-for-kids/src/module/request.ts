import { Interfaces, RequestApiConfig } from '../models/Interfaces';

// const BASE_URL = 'http://localhost:3000';
const BASE_URL = 'http://185.233.2.125';
export function requestFunction(config:RequestApiConfig):Promise<any> {
  return new Promise((resolve, reject) => {
    if (config.fetchConfig.headers) config.fetchConfig.headers.authentication = `${localStorage.getItem('hash')}`;
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
        if (err.status === 403) {
          alert('пользователь не авторизован');
        }
        err.text().then((errorMessage:string) => reject(errorMessage));
      });
  });
}

export async function getCategories():Promise<string[]> {
  const config = {
    url: `${BASE_URL}/api/categories/`,
    fetchConfig: {
      headers: {},
    },
  };
  const result = await requestFunction(config);
  return result;
}

export async function getWordsOfCategoryByIndex(index:number):Promise<Interfaces[]> {
  const config = {
    url: `${BASE_URL}/api/categories/${index}`,
    fetchConfig: {
      headers: {},
    },
  };
  const result = await requestFunction(config);
  return result;
}

export async function deleteCategory(index:number) {
  const config = {
    url: `${BASE_URL}/api/categories/${index}`,
    fetchConfig: {
      method: 'DELETE',
      headers: {},
    },
  };
  await requestFunction(config);
}

// export async function deleteEmptyCategoryRequest():Promise<string> {
//   let json;
//   const response = await fetch(`${BASE_URL}/api/categories/`, { method: 'DELETE' });
//   return response.status.toString();
// }

export async function deleteEmptyCategoryRequest() {
  const config = {
    url: `${BASE_URL}/api/categories/`,
    fetchConfig: {
      method: 'DELETE',
      headers: {},
    },
  };
  await requestFunction(config);
}

export async function createCategory(categoryName:string) {
  const config = {
    url: `${BASE_URL}/api/categories/`,
    fetchConfig: {
      method: 'POST',
      headers: {},
      body: `${categoryName}`,
    },
  };
  const result = await requestFunction(config);
  return result;
}

export async function deleteWord(categoryName:string, index:number) {
  const config = {
    url: `${BASE_URL}/api/words/${categoryName}/${index}`,
    fetchConfig: {
      method: 'DELETE',
      headers: {},
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
        headers: {},
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
        headers: {},
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
      headers: {},
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
      headers: { 'Content-Type': 'text/plain;charset=UTF-8', authentication: `${localStorage.getItem('hash')}` },
    },
  };
  await requestFunction(config);
}

export async function checkAuth() {
  const config = {
    url: `${BASE_URL}/api/login/check`,
    fetchConfig: {
      method: 'GET',
      headers: { 'Content-Type': 'text/plain;charset=UTF-8', authentication: `${localStorage.getItem('hash')}` },
    },
  };
  const result = await requestFunction(config);
  return result;
}
