import { IS_TRAIN_MODE, MOUSE_CLICK_ON_MENU } from './constants';

interface ObjState {
  type: string;
  mode: boolean;
}
interface NewState {
  type: string;
  mode: boolean;
}

const mode = (state = true, action:any) => {
  switch (action.type) {
    case IS_TRAIN_MODE: return action.mode;
    default: return state;
  }
};
const link = (state = '', action:any) => {
  switch (action.type) {
    case MOUSE_CLICK_ON_MENU: return action.link;
    default: return state;
  }
};

export function reducer(state: any, action:any) {
  return {
    mode: mode(state.mode, action),
    link: link(state.link, action),
  };
}
