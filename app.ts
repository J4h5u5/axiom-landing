import express from 'express';
import morgan from 'morgan';
import cors from 'cors';
import { userRouter } from './routes/userRouter';
import { usersCountRouter } from './routes/usersCountRouter';
import { readFile } from 'fs/promises';
import { IMilesConfig } from './interface';


export const app = express();

app.use(cors())

if (process.env.NODE_ENV === 'development') {
  app.use(morgan('dev'));
}

app.use(express.json());

app.use(express.static(`${__dirname}/public`));


app.use('/api/v1/users', userRouter);
app.use('/api/v1/usersCount', usersCountRouter)


export let milesConfig: IMilesConfig;

readFile(`${__dirname}/../../milesConfig.json`, 'utf8').then(data => {
    milesConfig = JSON.parse(data);
});
