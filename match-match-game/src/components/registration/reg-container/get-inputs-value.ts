import { IDB } from '../../indexeDB/indexeDB';
import { Input } from '../../input/input';
import appState from '../../appState/appState';

export function GetInputsValue(...inputs:Input[]) {
  const db = new IDB();
  const name = inputs[0].value;
  const lastName = inputs[1].value;
  const email = inputs[2].value;

  db.load(email, (arg: { name:string, lastName:string, email:string, score:number }) => {
    if (arg) appState.currentPlayerScore = arg.score;
  });
  appState.currentPlayerObj = {
    name, lastName, email, score: appState.currentPlayerScore,
  };
  db.save(appState.currentPlayerObj);

  // function f(arg:[]) {
  //   appState.allPlayers = arg;

  // console.log(appState.allPlayers);
  // }

  // console.log([name, lastName, email]);
  // db.loadAll(f);

  // db.load();

  // return { name, lastName, email };
}
