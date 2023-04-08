import mongoose from 'mongoose';
import dotenv from 'dotenv';
import { app } from './app';

dotenv.config({ path: './config.env' });

const DB = process.env.DATABASE?.replace(
  '<PASSWORD>',
  process.env.DATABASE_PASSWORD || ''
) || '';

mongoose
    .connect(DB, { autoIndex: true})
    .then(() => console.log('DB connection successful!'));

    console.log(process.env.NODE_ENV)
    console.log(process.env.PORT)
const port = 4000;

app.listen(port, () => {
    console.log(`App running on port ${port}...`);
});

