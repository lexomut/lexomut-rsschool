import { IS_TRAIN_MODE } from './constants';

export interface State {
  link: string;
  mode: boolean;
}

const initialState: State = { mode: true, link: '' };

export default initialState;
