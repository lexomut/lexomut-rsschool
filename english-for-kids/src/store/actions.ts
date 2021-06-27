import { IS_TRAIN_MODE } from './constants';
import store from './store';

export const changeSwitchStateAction = function (status:boolean) {
  return { type: IS_TRAIN_MODE, mode: status };
};

export const dispatchChangeSwitch = (value:boolean) => store.dispatch(changeSwitchStateAction(value));
