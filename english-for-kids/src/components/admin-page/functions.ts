import { getCategories } from '../../module/request';

export const getIndexByName = async (name:string) => {
  const categories = await getCategories();
  return categories.findIndex((word) => word === name);
};
export const getLocation = (): string[] => {
  let path = window.location.pathname;
  path = path.replace(/_/g, ' ').slice(1);
  const pathArr = path.split('/');
  return pathArr;
};
