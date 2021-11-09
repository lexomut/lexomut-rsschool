import { CHANGE_IN_ADMIN_PAGE, IS_TRAIN_MODE, MOUSE_CLICK_ON_MENU } from './constants';
import store from './store';

const changeSwitchStateAction = function f(status:boolean) {
  return { type: IS_TRAIN_MODE, mode: status };
};
const mouseClickOnMenu = function f1(linkMenu:string) {
  return { type: MOUSE_CLICK_ON_MENU, link: linkMenu };
};

const changeInAdminPage = function f2(action1:string) {
  return { type: CHANGE_IN_ADMIN_PAGE, actionOfChange: action1 };
};

export const dispatchChangeSwitch = (value:boolean):void => {
  store.dispatch(changeSwitchStateAction(value));
};
export const dispatchMouseClickOnMenu = (value:string):void => {
  store.dispatch(mouseClickOnMenu(value));
};

export const dispatchChangeInAdminPage = (value:string):void => {
  store.dispatch(changeInAdminPage(value));
};
