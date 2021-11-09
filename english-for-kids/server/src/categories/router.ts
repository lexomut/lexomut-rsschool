import { Router } from 'express';
import {
  createCategory,
  deleteCategory, deleteEmptyCategory, getAllWords, getCategories, getWordsByIndex, renameCategory,
} from './repository';
import { StatusCodes } from '../status-codes';
import { checkAuth } from '../login/login';

const router = Router();

router.get('/all', async (req, res) => {
  const allCategories = await getAllWords();
  return res.json(allCategories);
});

router.get('/', async (req, res) => {
  const allCategories = await getCategories();
  return res.json(allCategories);
});

router.get('/:index', async (req, res) => {
  // if (!checkAuth(String(req.headers.authentication)) || !req.headers.authentication) return res.status(403).send('user not Authorized');
  const index = Number(req.params.index);
  const allCategories = await getAllWords();
  if (Number.isNaN(index) || allCategories.length < index || index < 0) { return res.sendStatus(400); }
  const allWords = await getWordsByIndex(index);
  if (!allWords) { return res.sendStatus(404); }
  return res.json(allWords);
});

// Delete category
router.delete('/:index', async (req, res) => {
  if (!checkAuth(String(req.headers.authentication)) || !req.headers.authentication) return res.status(403).send('user not Authorized');
  const index = Number(req.params.index);
  const allCategories = await getAllWords();
  if (Number.isNaN(index) || allCategories.length < index || index < 0) { return res.sendStatus(400); }
  try {
    await deleteCategory(index).catch(console.log);
    return res.status(StatusCodes.Ok).json('ok');
  } catch (e) {
    return res.status(StatusCodes.BadRequest).send(e);
  }
});

// Create new category
router.post('/', async (req, res) => {
  if (!checkAuth(String(req.headers.authentication)) || !req.headers.authentication) return res.status(403).send('user not Authorized');
  const data = req.body;
  if (!data) return res.sendStatus(StatusCodes.BadRequest);
  try {
    const newCategory = await createCategory(data);
    return res.json(newCategory);
  } catch (e) {
    return res.status(StatusCodes.BadRequest).send(e);
  }
});

router.delete('/', async (req, res) => {
  await deleteEmptyCategory().catch(console.log);
  return res.status(StatusCodes.Ok).json('error category deleted');
});

router.post('/:index', async (req, res) => {
  if (!checkAuth(String(req.headers.authentication)) || !req.headers.authentication) return res.status(403).send('user not Authorized');
  const index = Number(req.params.index);
  const data = req.body;
  if (!data) return res.sendStatus(StatusCodes.BadRequest);
  try {
    const result = await renameCategory(data, index);
    return res.json(result);
  } catch (e) {
    return res.status(StatusCodes.BadRequest).send(e.message);
  }
});

export default router;
