import express from 'express';
import heroController from './controllers/heroController.js';
import petController from './controllers/petController.js';
import authController from './controllers/authController.js';
import { connectDB } from './db.js';
import cors from 'cors';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();

app.use(express.json());
app.use(cors());

// Servir archivos estáticos
app.use(express.static(__dirname));

// Ruta específica para el archivo HTML
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'interfaz.html'));
});

app.use('/api', heroController);
app.use('/api', petController);
app.use('/api', authController);

connectDB();

const PORT = 3001;
app.listen(PORT, () => {
  console.log(`Servidor corriendo en http://localhost:${PORT}`);
  console.log(`Interfaz disponible en http://localhost:${PORT}/interfaz.html`);
});
