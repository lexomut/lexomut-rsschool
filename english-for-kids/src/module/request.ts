import { CartInterface } from '../models/CartInterface';
import { StatusCodes } from '../../server/src/status-codes';

export async function getCategories():Promise<string[]> {
  let json;
  const response = await fetch('http://localhost:3000/categories');
  if (response.ok) {
    json = await response.json();
  } else {
    console.log(`Ошибка HTTP: ${response.status}`);
  }

  return json;
}

export async function getWords():Promise<CartInterface[][]> {
  let json;
  const response = await fetch('http://localhost:3000/all');
  if (response.ok) {
    json = await response.json();
    // console.log(response);
  } else {
    console.log(`Ошибка HTTP: ${response.status}`);
  }
  // console.log(json);
  return json;
}

export async function getWordsOfCategoryByIndex(index:number):Promise<CartInterface[]> {
  let json;
  const response = await fetch(`http://localhost:3000/categories/${index}`);
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
  const response = await fetch(`http://localhost:3000/categories/${index}`, { method: 'DELETE' });
  return response.status.toString();
}

export async function deleteEmptyCategoryRequest():Promise<string> {
  let json;
  const response = await fetch('http://localhost:3000/', { method: 'DELETE' });
  return response.status.toString();
}

export async function createCategory(categoryName:string):Promise<unknown> {
  const response = await fetch('http://localhost:3000/', {
    method: 'POST',
    headers: { 'Content-Type': 'text/plain;charset=UTF-8' },
    body: `${categoryName}`,
  });
  return response.json();
}

export async function renameCategory(categoryName:string, index:number):Promise<unknown> {
  return new Promise((resolve, reject) => {
    fetch(`http://localhost:3000/categories/${index}`, {
      method: 'POST',
      headers: { 'Content-Type': 'text/plain;charset=UTF-8' },
      body: `${categoryName}`,
    })
      .then((response) => {
        // eslint-disable-next-line
        if (!response.ok) throw response;
        return response.json();
      })
      .then((json) => resolve(json))
      .catch((err) => {
        err.text().then((errorMessage:string) => reject(errorMessage));
      });
  });
}

// function handleResponse(response:any) {
//   return response.json()
//     .then((json:any) => {
//       if (!response.ok) {
//         const error = {
//           ...json,
//           status: response.status,
//           statusText: response.statusText,
//
//         };
//         console.dir(error);
//
//         return Promise.reject(error);
//       }
//       return json;
//     });
// }
//
// function doSomethingWithTheResolvedJSON(json:any) {
//   // With great power, comes great responsibility
//
//   console.log(json);
//
//   // :-P
// }
//
// export async function renameCategory(categoryName:string, index:number):Promise<unknown> {
//   fetch(`http://localhost:3000/categories/${index}`, {
//     method: 'POST',
//     headers: { 'Content-Type': 'text/plain;charset=UTF-8' },
//     body: `${categoryName}`,
//   })
//     .then(handleResponse)
//     .then(doSomethingWithTheResolvedJSON)
//     .catch((error) => {
//     // This error object will have the error from the server
//     // As well as the two additions we made earlier of the status and statusText
//       console.log(error);
//     });
//   return Promise.resolve('');
// }
