import { Input } from '../../input/input';
import { IDB } from '../../indexeDB/indexeDB';

export function GetInputsValue(...inputs:Input[]) {
  const name = inputs[0].value;
  const lastName = inputs[1].value;
  const email = inputs[2].value;
  const db = new IDB({
    id: 1, name, lastName, email,
  });
  db.save();
  // console.log([name, lastName, email]);
  db.load();

  return { name, lastName, email };
}
