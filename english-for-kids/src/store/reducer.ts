import { IS_TRAIN_MODE } from './constants';

interface ObjState {
  type: string;
  mode: boolean;
}
interface NewState {
  type: string;
  mode: boolean;
}

export function reducer(state: any, action:ObjState): NewState {
  switch (action.type) {
    case IS_TRAIN_MODE: return { mode: action.mode, type: IS_TRAIN_MODE };

    default: return state;
  }
}
