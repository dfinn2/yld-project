import express from 'express';
import { searchProducts } from './routes/search';


const app = express();

app.get('/search', searchProducts);
