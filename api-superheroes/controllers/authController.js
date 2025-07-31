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
  const hash = await bcrypt.hash(password, 10);
  const user = await userRepository.createUser({ username, password: hash, email });

  if (mascotaId) {
    // Adoptar mascota existente
    pet = await petRepository.getPetById(mascotaId);
    if (!pet) return res.status(400).json({ error: 'Mascota no encontrada' });
    if (pet.adoptedBy) return res.status(400).json({ error: 'Mascota ya tiene dueño' });
    pet.adoptedBy = user.id || user._id;
    await petRepository.updatePet(pet.id, pet);
    await userRepository.setMascotaId(user.id || user._id, pet.id);
  } else if (mascotaNueva) {
    // Crear nueva mascota
    pet = await petRepository.addPet(mascotaNueva);
    pet.adoptedBy = user.id || user._id;
    await petRepository.updatePet(pet.id, pet);
    await userRepository.setMascotaId(user.id || user._id, pet.id);
  }
  // Si no hay mascotaId ni mascotaNueva, simplemente se crea el usuario sin mascota

  // Generar token
  const token = jwt.sign({ userId: user._id }, JWT_SECRET, { expiresIn: '2h' });
  
  // Verificar si el usuario tiene una mascota después del registro
  let hasPet = false;
  let petData = null;
  
  if (user.mascotaId) {
    try {
      const pet = await petRepository.getPetById(user.mascotaId);
      if (pet) {
        hasPet = true;
        petData = {
          id: pet.id,
          name: pet.name,
          alias: pet.alias,
          vida: pet.vida,
          felicidad: pet.felicidad,
          hambre: pet.hambre,
          enfermedad: pet.enfermedad,
          viva: pet.viva
        };
      }
    } catch (error) {
      console.error('Error al obtener mascota del usuario:', error);
    }
  }
  
  res.json({ 
    token, 
    hasPet, 
    petData 
  });
});

// Login
router.post('/auth/login', async (req, res) => {
  const { username, password } = req.body;
  const user = await userRepository.findByUsername(username);
  if (!user) return res.status(400).json({ error: 'Usuario o contraseña incorrectos' });
  const valid = await bcrypt.compare(password, user.password);
  if (!valid) return res.status(400).json({ error: 'Usuario o contraseña incorrectos' });
  
  // Verificar si el usuario tiene una mascota
  let hasPet = false;
  let petData = null;
  
  if (user.mascotaId) {
    try {
      const pet = await petRepository.getPetById(user.mascotaId);
      if (pet) {
        hasPet = true;
        petData = {
          id: pet.id,
          name: pet.name,
          alias: pet.alias,
          vida: pet.vida,
          felicidad: pet.felicidad,
          hambre: pet.hambre,
          enfermedad: pet.enfermedad,
          viva: pet.viva
        };
      }
    } catch (error) {
      console.error('Error al obtener mascota del usuario:', error);
    }
  }
  
  const token = jwt.sign({ userId: user._id }, JWT_SECRET, { expiresIn: '2h' });
  res.json({ 
    token, 
    hasPet, 
    petData 
  });
});

export default router; 