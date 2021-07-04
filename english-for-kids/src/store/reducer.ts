import { IS_TRAIN_MODE, MOUSE_CLICK_ON_MENU } from './constants';

const mode = (state = true, action:{ type:string; mode:boolean }) => {
  switch (action.type) {
    case IS_TRAIN_MODE: return action.mode;
    default: return state;
  }
};
const link = (state = '', action:{ type:string; link:string }) => {
  switch (action.type) {
    case MOUSE_CLICK_ON_MENU: return action.link;
    default: return state;
  }
};

export function reducer(state:any, action:any) {
  return {
    mode: mode(state.mode, action),
    link: link(state.link, action),
  };
}
