import { Router } from 'express';
import {
  createCategory,
  deleteCategory, deleteEmptyCategory, getAllWords, getCategories, getWordsByIndex,
} from './repository';
import { StatusCodes } from './status-codes';


const router = Router();

router.get('/all', async (req, res) => {
  const categories = await getAllWords();
  res.json(categories);
});

router.get('/categories', async (req, res) => {
  const categories = await getCategories();
  res.json(categories);
});

router.get('/categories/:index', async (req, res) => {
  const index = Number(req.params.index);
  const categories = await getAllWords();
  if (Number.isNaN(index) || categories.length < index || index < 0) { return res.sendStatus(400); }
  const words = await getWordsByIndex(index);
  if (!words) { return res.sendStatus(404); }
  return res.json(words);
});

// Delete category
router.delete('/categories/:index', async (req, res) => {
  const index = Number(req.params.index);
  const categories = await getAllWords();
  if (Number.isNaN(index) || categories.length < index || index < 0) { return res.sendStatus(400); }
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

export default router;
