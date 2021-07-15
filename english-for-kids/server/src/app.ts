import express from 'express';
import cors from 'cors';
import path from 'path';

import categories from './categories/router';
import wordsRouter from './words/wordsRouter';

const staticFilesPath = path.resolve(__dirname, '../../dist');
const app = express();
const indexPath = path.resolve(__dirname, '../../dist/index.html');

app.use(express.json());
app.use(express.text());
app.use(express.urlencoded({ extended: true }));
app.use(cors());

app.use(/^(?!\/api\/)/, express.static(staticFilesPath));
app.use(/^(?!\/api\/)/, (req, res) => {
  res.sendFile(indexPath);
});

app.use('/api/categories', categories);
app.use('/api/words', wordsRouter);
app.listen(3000, () => console.log('server started on port 3000'));
