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

const port = process.env.NODE_ENV === 'development' ? (process.env.PORT || 80) : 4000;

app.listen(port, () => {
    console.log(`App running on port ${port}...`);
});

