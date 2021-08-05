import 'reflect-metadata';
import './database/connection';
import express from 'express';
import cors from 'cors';
import 'dotenv/config';
import { router } from './router';
import path from 'path';

const app = express();

app.use(cors());
app.use(express.json());
app.use(router);
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

app.listen(process.env.SERVER_PORT || 3333, () => { 
    console.log("server in", process.env.SERVER_PORT);
});
