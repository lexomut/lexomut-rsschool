export interface State {
  link: string;
  mode: boolean;
  actionOfChange: string;
}

const initialState: State = { mode: true, link: '', actionOfChange: 'ww' };

export default initialState;
