export interface State {
  link: string;
  mode: boolean;
}

const initialState: State = { mode: true, link: '' };

export default initialState;
