import { Router } from 'express';
import {
  createCategory,
  deleteCategory, deleteEmptyCategory, getAllWords, getCategories, getWordsByIndex, renameCategory,
} from './repository';
import { StatusCodes } from '../status-codes';

const router = Router();

router.get('/all', async (req, res) => {
  const allCategories = await getAllWords();
  res.json(allCategories);
});

router.get('/', async (req, res) => {
  const allCategories = await getCategories();
  res.json(allCategories);
});

router.get('/:index', async (req, res) => {
  const index = Number(req.params.index);
  const allCategories = await getAllWords();
  if (Number.isNaN(index) || allCategories.length < index || index < 0) { return res.sendStatus(400); }
  const allWords = await getWordsByIndex(index);
  if (!allWords) { return res.sendStatus(404); }
  return res.json(allWords);
});

// Delete category
router.delete('/:index', async (req, res) => {
  const index = Number(req.params.index);
  const allCategories = await getAllWords();
  if (Number.isNaN(index) || allCategories.length < index || index < 0) { return res.sendStatus(400); }
  try {
    await deleteCategory(index).catch(console.log);
    return res.sendStatus(StatusCodes.Ok);
  } catch (e) {
    return res.status(StatusCodes.BadRequest).send(e);
  }
});

// Create new category
router.post('/', async (req, res) => {
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
  try {
    await deleteEmptyCategory().catch(console.log);
    return res.sendStatus(StatusCodes.Ok);
  } catch (e) {
    return res.status(StatusCodes.BadRequest).send(e);
  }
});

router.post('/:index', async (req, res) => {
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
