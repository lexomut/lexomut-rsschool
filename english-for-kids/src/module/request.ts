import { CartInterface } from '../models/CartInterface';

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
