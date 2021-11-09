const appState = {
  sizeSetting: 8,
  category: 'animal',
  regUser: false,
  activePage: 'aboutGame',
  stateHeaderBtn: 'reg',
  stopGame: false,
  allPlayers: [],
  currentPlayerObj: {
    name: '', lastName: '', email: '', score: 0,
  },
  currentPlayerScore: 0,
  score: [{
    name: '', lastName: '', email: '', score: 0,
  }],
};
export default appState;
