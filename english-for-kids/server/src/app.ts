import express from 'express';
import cors from 'cors';
import categories from './router';

process.once('SIGUSR2', () => {
  process.kill(process.pid, 'SIGUSR2');
});

const app = express();
app.use(express.json());
app.use(express.text());
app.use(express.urlencoded({ extended: true }));
app.use(cors());

app.use('/', categories);
app.listen(3000, () => console.log('server started on port 3000'));
