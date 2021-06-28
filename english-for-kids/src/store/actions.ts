import { IS_TRAIN_MODE, MOUSE_CLICK_ON_MENU } from './constants';
import store from './store';

const changeSwitchStateAction = function (status:boolean) {
  return { type: IS_TRAIN_MODE, mode: status };
};
 const mouseClickOnMenu = function (linkMenu:string) {
  return { type: MOUSE_CLICK_ON_MENU, link: linkMenu };
};

export const dispatchChangeSwitch = (value:boolean) => store.dispatch(changeSwitchStateAction(value));
export const dispatchMouseClickOnMenu = (value:string) => store.dispatch(mouseClickOnMenu(value));
