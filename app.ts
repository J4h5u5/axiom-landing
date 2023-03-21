import express from 'express';
import morgan from 'morgan';

import { referralRouter } from './routes/referralRouter';

export const app = express();

if (process.env.NODE_ENV === 'development') {
  app.use(morgan('dev'));
}

app.use(express.json());
app.use(express.static(`${__dirname}/public`));

app.use((req, res, next) => {
  console.log('Hello from the middleware 👋');
  next();
});


app.use('/api/v1/referrals', referralRouter);
