import { IS_TRAIN_MODE } from './constants';

export interface State {
  type: string;
  mode: boolean;
}

const initialState: State = { type: IS_TRAIN_MODE, mode: true };

export default initialState;
