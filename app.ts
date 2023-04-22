import express from 'express';
import morgan from 'morgan';
const app = express();

app.use(morgan('tiny'));
app.use(express.json());



app.get('/ping', (_req, res) => {
  console.log('someone pinged here');
  res.status(200).send('pong pong');
});

export default app;