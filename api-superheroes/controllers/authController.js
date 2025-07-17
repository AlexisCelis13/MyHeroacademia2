import express from 'express';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import userRepository from '../repositories/userRepository.js';
import petRepository from '../repositories/petRepository.js';

const router = express.Router();
const JWT_SECRET = 'supersecretkey'; // Cambia esto en producción

// Registro
router.post('/auth/register', async (req, res) => {
  const { username, password, email, mascotaId, mascotaNueva } = req.body;
  if (!username || !password) {
    return res.status(400).json({ error: 'Username y password requeridos' });
  }
  const existing = await userRepository.findByUsername(username);
  if (existing) {
    return res.status(400).json({ error: 'El usuario ya existe' });
  }
  let pet = null;
  if (mascotaId) {
    // Adoptar mascota existente
    pet = await petRepository.getPetById(mascotaId);
    if (!pet) return res.status(400).json({ error: 'Mascota no encontrada' });
    if (pet.adoptedBy) return res.status(400).json({ error: 'Mascota ya tiene dueño' });
    pet.adoptedBy = null; // por si acaso
  } else if (mascotaNueva) {
    // Crear nueva mascota
    pet = await petRepository.addPet(mascotaNueva);
  } else {
    return res.status(400).json({ error: 'Debes elegir una mascota existente o crear una nueva' });
  }
  const hash = await bcrypt.hash(password, 10);
  const user = await userRepository.createUser({ username, password: hash, email });
  pet.adoptedBy = user._id;
  await petRepository.updatePet(pet.id, pet);
  await userRepository.setMascotaId(user._id, pet.id);
  // Generar token
  const token = jwt.sign({ userId: user._id }, JWT_SECRET, { expiresIn: '2h' });
  res.json({ token });
});

// Login
router.post('/auth/login', async (req, res) => {
  const { username, password } = req.body;
  const user = await userRepository.findByUsername(username);
  if (!user) return res.status(400).json({ error: 'Usuario o contraseña incorrectos' });
  const valid = await bcrypt.compare(password, user.password);
  if (!valid) return res.status(400).json({ error: 'Usuario o contraseña incorrectos' });
  const token = jwt.sign({ userId: user._id }, JWT_SECRET, { expiresIn: '2h' });
  res.json({ token });
});

export default router; 