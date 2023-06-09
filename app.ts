import express from 'express';
import morgan from 'morgan';
import journeyRouter from './controllers/journeys';
import { ErrorHandler } from './middlewares';
import stationsRouter from './controllers/stations';
import authRouter from './controllers/authentication';
const app = express();

app.use(morgan('tiny'));
app.use(express.json());
app.use(express.static('build'));



app.use('/api/journeys',journeyRouter);
app.use('/api/stations',stationsRouter);
app.use('/api/auth',authRouter);
app.get('/api/info', (req, res) => {
  res.status(200).send(`helsinki city bike api ${new Date()}`);
});

app.use(ErrorHandler);

export default app;