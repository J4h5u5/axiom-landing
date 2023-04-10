import fs from 'fs';
import express from 'express';
import morgan from 'morgan';
import cors from 'cors';
import cron from 'node-cron';

import { userRouter } from './routes/userRouter';
import { usersCountRouter } from './routes/usersCountRouter';
import { readFile } from 'fs/promises';
import { IMilesConfig } from './interface';
import { User } from './models/userModel';
import dotenv from 'dotenv';

dotenv.config({ path: './config.env' });

export const app = express();

app.use(cors());

if (process.env.NODE_ENV === 'development') {
    app.use(morgan('dev'));
}

// app.use(morgan('tiny', { stream: fs.createWriteStream('./server.log', { flags: 'a' }) }));

app.use(express.json());

app.use(express.static(`${__dirname}/public`));

app.use('/api/v1/users', userRouter);
app.use('/api/v1/usersCount', usersCountRouter);

export let milesConfig: IMilesConfig;

readFile(`${__dirname}/milesConfig.json`, 'utf8').then((data) => {
    milesConfig = JSON.parse(data);
});

// cron.schedule('0 0 0 * * *', function () {
//     const stream = fs.createWriteStream('./miles.log', { flags: 'a' });

//     stream.write(`${Date.now()}:\n`);

//     User.updateMany(
//         {},
//         {
//             $set: { lastDailyMilesPayout: new Date() },
//             $inc: { miles: milesConfig.daily },
//         }
//     )
//         .then((a) => {
//             stream.write('daily miless paid succesfull');
//             stream.end();
//         })
//         .catch((err) => {
//             stream.write(`daily miless did not paid, error:\n${err}`);
//             stream.end();
//         });
// });

// cron.schedule('0 0 * * 0', function () {
//     // каждую неделю чистить server.log
//     fs.writeFile(`${__dirname}/server.log`, `Cleared at: ${new Date().toString()}`, (err) => {
//         if (err) throw err;
//         console.log('The log file was cleared!');
//     });
// });
