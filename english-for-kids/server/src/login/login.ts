import { Router } from 'express';

import { StatusCodes } from '../status-codes';
import hashes from './hash';

// eslint-disable-next-line no-bitwise,no-param-reassign
const hashCode = (s:string) => s.split('').reduce((a, b) => { a = ((a << 5) - a) + b.charCodeAt(0); return a & a; }, 0);

const routerLog = Router();

export const checkAuth = (hash:string) => {
  if (hashes.find((item) => item === hash)) return true;
  return false;
};

routerLog.post('/', async (req, res) => {
  const data = req.body;
  const loginPass = JSON.parse(data);
  if (!loginPass.login || !loginPass.pass) return res.sendStatus(400);
  const hash = String(hashCode(loginPass.login + loginPass.pass + String(new Date().getTime())));
  hashes.push(hash);
  if (loginPass.login === 'admin' && loginPass.pass === 'admin') return res.status(StatusCodes.Ok).json(hash);
  return res.status(StatusCodes.BadRequest).send('login or pass incorrect');
});

routerLog.delete('/', async (req, res) => {
  const auth = String(req.headers.authentication);
  if (!checkAuth(auth) || !auth) return res.status(StatusCodes.Ok).json('user not Authorized');
  const index = hashes.findIndex((item) => auth === item);

  hashes.splice(index, 1);
  return res.status(StatusCodes.Ok).json('ok');
});

routerLog.get('/check', async (req, res) => {
  if (!checkAuth(String(req.headers.authentication)) || !req.headers.authentication) return res.status(403).send('user not Authorized');

  return res.status(StatusCodes.Ok).json('ok');
});

export default routerLog;
