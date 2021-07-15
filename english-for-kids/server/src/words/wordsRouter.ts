import { Router } from 'express';
// eslint-disable-next-line import/no-extraneous-dependencies
import multer from 'multer';
import { categories, words } from '../data';
import {
  createEmptyWord, deleteWord, replaceWord,
} from './repository';
import { StatusCodes } from '../status-codes';
import { UPLOAD_FILE_PATH } from '../Constatnts';

const storageConfig = multer.diskStorage({
  destination: (req, file, cb) => {
    if (file.mimetype === 'audio/mpeg') cb(null, `${UPLOAD_FILE_PATH}/audio`);
    else if (file.mimetype === 'image/jpeg') cb(null, `${UPLOAD_FILE_PATH}/img`);
    else cb(null, `${UPLOAD_FILE_PATH}`);
  },
  filename: (req, file, cb) => {
    cb(null, file.originalname);
  },
});

export const upload = multer({ storage: storageConfig });

const wordsRouter = Router();

wordsRouter.delete('/:name/:index', async (req, res) => {
  const index = Number(req.params.index);
  const nameCategory = String(req.params.name);
  const indexOfCategory = categories.findIndex((item) => nameCategory === item);
  if (indexOfCategory < 0 || index < 0) return res.sendStatus(400);

  if (Number.isNaN(index) || words[indexOfCategory].length < index || index < 0) { return res.sendStatus(400); }
  try {
    const message = await deleteWord(indexOfCategory, index);
    return res.status(StatusCodes.Ok).json(message);
  } catch (e) {
    console.log(e);
    return res.status(StatusCodes.BadRequest).send(e.message);
  }
});
wordsRouter.post('/rename/:name/:index', async (req, res) => {
  const data = req.body;
  const index = Number(req.params.index);
  const nameCategory = String(req.params.name).replace(/%/g, ' ');
  const indexOfCategory = categories.findIndex((item) => nameCategory === item);
  if (indexOfCategory < 0 || index < 0) return res.sendStatus(400);

  if (Number.isNaN(index) || words[indexOfCategory].length < index || index < 0) { return res.sendStatus(400); }
  try {
    const message = await replaceWord(indexOfCategory, index, JSON.parse(data));
    return res.status(StatusCodes.Ok).json(message);
  } catch (e) {
    console.log(e);
    return res.status(StatusCodes.BadRequest).send(e.message);
  }
});

wordsRouter.post('/:name/', async (req, res) => {
  const nameCategory = String(req.params.name).replace(/%/g, ' ');
  const indexOfCategory = categories.findIndex((item) => nameCategory === item);
  if (indexOfCategory < 0) return res.status(400).send(`Category with name  ${nameCategory}  not exists`);

  try {
    const message = await createEmptyWord(indexOfCategory);
    console.log('createEmptyWord  complite');
    return res.status(StatusCodes.Ok).json(message);
  } catch (e) {
    console.log(e);
    return res.status(StatusCodes.BadRequest).send(e.message);
  }
});

wordsRouter.post('/upload/:name/:index', upload.any(), async (req, res) => {
  const data = JSON.parse(req.body.wordConfig);
  const index = Number(req.params.index);
  const nameCategory = String(req.params.name).replace(/%/g, ' ');
  const indexOfCategory = categories.findIndex((item) => nameCategory === item);
  if (indexOfCategory < 0 || index < 0) return res.sendStatus(400);
  if (Number.isNaN(index) || words[indexOfCategory].length < index || index < 0) { return res.sendStatus(400); }

  try {
    const message = await replaceWord(indexOfCategory, index, data);
    return res.status(StatusCodes.Ok).json(message);
  } catch (e) {
    console.log(e);
    return res.status(StatusCodes.BadRequest).send(e.message);
  }
});

export default wordsRouter;
