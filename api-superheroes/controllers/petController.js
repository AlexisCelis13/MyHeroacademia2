import express from 'express';
import { check, validationResult } from 'express-validator';
import petService from '../services/petService.js';
import Pet from '../models/petModel.js';
import { requireAuth } from '../middleware/auth.js';
import userRepository from '../repositories/userRepository.js';
import heroRepository from '../repositories/heroRepository.js';

const router = express.Router();

router.get('/pets', async (req, res) => {
  try {
    const pets = await petService.getAllPets();
    res.json(pets);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

router.post('/pets',
  [
    check('name').not().isEmpty().withMessage('El nombre es requerido'),
    check('alias').not().isEmpty().withMessage('El alias es requerido')
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ error: errors.array() });
    }
    try {
      const { name, alias, city, team } = req.body;
      const newPet = new Pet(null, name, alias, city, team);
      const addedPet = await petService.addPet(newPet);
      res.status(201).json(addedPet);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }
);

router.put('/pets/:id', async (req, res) => {
  try {
    const updatedPet = await petService.updatePet(req.params.id, req.body);
    res.json(updatedPet);
  } catch (error) {
    res.status(404).json({ error: error.message });
  }
});

router.delete('/pets/:id', async (req, res) => {
  try {
    const result = await petService.deletePet(req.params.id);
    res.json(result);
  } catch (error) {
    res.status(404).json({ error: error.message });
  }
});

router.get('/pets/city/:city', async (req, res) => {
  try {
    const pets = await petService.findPetsByCity(req.params.city);
    res.json(pets);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

router.post('/pets/:id/enfrentar', async (req, res) => {
  try {
    const result = await petService.faceVillain(req.params.id, req.body.villain);
    res.json({ message: result });
  } catch (error) {
    res.status(404).json({ error: error.message });
  }
});

router.post('/pets/:id/adoptar', async (req, res) => {
  const heroId = req.body.heroId;
  if (!heroId) {
    return res.status(400).json({ error: 'Se requiere el id del héroe para adoptar.' });
  }
  try {
    const pet = await petService.adoptPet(req.params.id, heroId);
    res.json(pet);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

router.post('/pets/:id/desadoptar', async (req, res) => {
  const heroId = req.body.heroId;
  if (!heroId) {
    return res.status(400).json({ error: 'Se requiere el id del héroe para desadoptar.' });
  }
  try {
    const pet = await petService.unadoptPet(req.params.id, heroId);
    res.json(pet);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// ENDPOINTS DEL JUEGO DE MASCOTAS

// Obtener el estado de la mascota (protegido)
router.get('/pets/:id/estado', requireAuth, async (req, res) => {
  const user = await userRepository.findById(req.userId);
  if (!user || user.mascotaId !== parseInt(req.params.id)) {
    return res.status(403).json({ error: 'No tienes permiso para ver esta mascota' });
  }
  try {
    const estado = await petService.getEstado(req.params.id);
    res.json(estado);
  } catch (error) {
    res.status(404).json({ error: error.message });
  }
});

// Alimentar mascota (protegido)
router.put('/pets/:id/alimentar', requireAuth, async (req, res) => {
  const user = await userRepository.findById(req.userId);
  if (!user || user.mascotaId !== parseInt(req.params.id)) {
    return res.status(403).json({ error: 'No tienes permiso para modificar esta mascota' });
  }
  try {
    const pet = await petService.alimentar(req.params.id);
    res.json(pet);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// Pasear mascota (protegido)
router.put('/pets/:id/pasear', requireAuth, async (req, res) => {
  const user = await userRepository.findById(req.userId);
  if (!user || user.mascotaId !== parseInt(req.params.id)) {
    return res.status(403).json({ error: 'No tienes permiso para modificar esta mascota' });
  }
  try {
    const pet = await petService.pasear(req.params.id);
    res.json(pet);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// Jugar con mascota (protegido)
router.put('/pets/:id/jugar', requireAuth, async (req, res) => {
  const user = await userRepository.findById(req.userId);
  if (!user || user.mascotaId !== parseInt(req.params.id)) {
    return res.status(403).json({ error: 'No tienes permiso para modificar esta mascota' });
  }
  try {
    const pet = await petService.jugar(req.params.id);
    res.json(pet);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// Curar mascota (protegido)
router.put('/pets/:id/curar', requireAuth, async (req, res) => {
  const user = await userRepository.findById(req.userId);
  if (!user || user.mascotaId !== parseInt(req.params.id)) {
    return res.status(403).json({ error: 'No tienes permiso para modificar esta mascota' });
  }
  try {
    const pet = await petService.curar(req.params.id);
    res.json(pet);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// Vestir mascota (protegido)
router.put('/pets/:id/vestir', requireAuth, async (req, res) => {
  const user = await userRepository.findById(req.userId);
  if (!user || user.mascotaId !== parseInt(req.params.id)) {
    return res.status(403).json({ error: 'No tienes permiso para modificar esta mascota' });
  }
  const { item } = req.body;
  if (!item) {
    return res.status(400).json({ error: 'Debes especificar el item a vestir.' });
  }
  try {
    const pet = await petService.vestir(req.params.id, item);
    res.json(pet);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// Historial de acciones (protegido)
router.get('/pets/:id/historial', requireAuth, async (req, res) => {
  const user = await userRepository.findById(req.userId);
  if (!user || user.mascotaId !== parseInt(req.params.id)) {
    return res.status(403).json({ error: 'No tienes permiso para ver esta mascota' });
  }
  try {
    const historial = await petService.getHistorial(req.params.id);
    res.json(historial);
  } catch (error) {
    res.status(404).json({ error: error.message });
  }
});

// Revivir mascota (protegido)
router.put('/pets/:id/revivir', requireAuth, async (req, res) => {
  const user = await userRepository.findById(req.userId);
  if (!user || user.mascotaId !== parseInt(req.params.id)) {
    return res.status(403).json({ error: 'No tienes permiso para modificar esta mascota' });
  }
  try {
    const pet = await petService.revivir(req.params.id);
    res.json(pet);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// Obtener la mascota del usuario autenticado
router.get('/pets/mi-mascota', requireAuth, async (req, res) => {
  try {
    const user = await userRepository.findById(req.userId);
    if (!user || !user.mascotaId) return res.status(404).json({ error: 'No tienes mascota asociada' });
    const pet = await petService.getEstado(user.mascotaId, true); // true para obtener todos los datos
    let superheroe = null;
    if (pet.adoptedBy) {
      const hero = await heroRepository.getHeroById(pet.adoptedBy);
      if (hero) {
        superheroe = { id: hero.id, name: hero.name, alias: hero.alias };
      }
    }
    res.json({
      id: pet.id,
      name: pet.name,
      superheroe,
      felicidad: pet.felicidad,
      hambre: pet.hambre,
      enfermedad: pet.enfermedad,
      itemsCustom: pet.itemsCustom,
      viva: pet.viva,
      vida: pet.vida
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Mascotas disponibles (sin dueño)
router.get('/pets/disponibles', async (req, res) => {
  try {
    const pets = await petService.getAllPets();
    const disponibles = pets.filter(p => !p.adoptedBy);
    res.json(disponibles.map(p => ({ id: p.id, name: p.name, alias: p.alias })));
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

export default router; 