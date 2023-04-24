import express from 'express';
import morgan from 'morgan';
const app = express();

app.use(morgan('tiny'));
app.use(express.json());
app.use(express.static('build'));



app.get('/api/info', (_req, res) => {
  res.status(200).send(`helsinki city bike api ${new Date()}`);
});

export default app;