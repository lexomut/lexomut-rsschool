import { IS_TRAIN_MODE, MOUSE_CLICK_ON_MENU } from './constants';
import store from './store';

const changeSwitchStateAction = function f(status:boolean) {
  return { type: IS_TRAIN_MODE, mode: status };
};
const mouseClickOnMenu = function f1(linkMenu:string) {
  return { type: MOUSE_CLICK_ON_MENU, link: linkMenu };
};

export const dispatchChangeSwitch = (value:boolean):void => {
  store.dispatch(changeSwitchStateAction(value));
};
export const dispatchMouseClickOnMenu = (value:string):void => {
  store.dispatch(mouseClickOnMenu(value));
};
