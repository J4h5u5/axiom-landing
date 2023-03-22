import express from 'express';
import morgan from 'morgan';
import { userRouter } from './routes/userRouter';


export const app = express();

if (process.env.NODE_ENV === 'development') {
  app.use(morgan('dev'));
}
app.use(express.static(`${__dirname}/public`));
app.use(express.json());

app.use(express.static(`${__dirname}/public`));


app.use('/api/v1/users', userRouter);
