import express from 'express';
import heroController from './controllers/heroController.js';
import petController from './controllers/petController.js';
import authController from './controllers/authController.js';
import { connectDB } from './db.js';
import cors from 'cors';

const app = express();

app.use(express.json());
app.use(cors());
app.use('/api', heroController);
app.use('/api', petController);
app.use('/api', authController);

connectDB();

const PORT = 3001;
app.listen(PORT, () => {
  console.log(`Servidor corriendo en http://localhost:${PORT}`);
});
