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
    await petService.deletePet(req.params.id);
    res.status(204).send();
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

router.post('/pets/:id/adoptar', requireAuth, async (req, res) => {
  const heroId = req.body.heroId;
  if (!heroId) {
    return res.status(400).json({ error: 'Se requiere el id del héroe para adoptar.' });
  }
  
  try {
    // Verificar que el usuario existe
    const user = await userRepository.findById(req.userId);
    if (!user) {
      return res.status(404).json({ error: 'Usuario no encontrado' });
    }
    
    // Adoptar la mascota (vincular al héroe)
    const pet = await petService.adoptPet(req.params.id, heroId);
    
    // Vincular la mascota al usuario
    await userRepository.setMascotaId(req.userId, parseInt(req.params.id));
    
    res.json(pet);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

router.post('/pets/:id/desadoptar', requireAuth, async (req, res) => {
  const heroId = req.body.heroId;
  if (!heroId) {
    return res.status(400).json({ error: 'Se requiere el id del héroe para desadoptar.' });
  }
  
  try {
    // Verificar que el usuario existe
    const user = await userRepository.findById(req.userId);
    if (!user) {
      return res.status(404).json({ error: 'Usuario no encontrado' });
    }
    
    // Desadoptar la mascota (desvincular del héroe)
    const pet = await petService.unadoptPet(req.params.id, heroId);
    
    // Desvincular la mascota del usuario
    await userRepository.setMascotaId(req.userId, null);
    
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

// Quitar accesorio de mascota (protegido)
router.put('/pets/:id/quitar-accesorio', requireAuth, async (req, res) => {
  const user = await userRepository.findById(req.userId);
  if (!user || user.mascotaId !== parseInt(req.params.id)) {
    return res.status(403).json({ error: 'No tienes permiso para modificar esta mascota' });
  }
  const { item } = req.body;
  if (!item) {
    return res.status(400).json({ error: 'Debes especificar el item a quitar.' });
  }
  try {
    const pet = await petService.quitarAccesorio(req.params.id, item);
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

// Adoptar mascota por nombre
router.post('/pets/adoptar-por-nombre', requireAuth, async (req, res) => {
  const { petName, heroId } = req.body;
  
  console.log('=== ADOPTAR POR NOMBRE ===');
  console.log('petName:', petName);
  console.log('heroId:', heroId);
  console.log('req.userId:', req.userId);
  
  if (!petName || !heroId) {
    console.log('Error: Faltan parámetros');
    return res.status(400).json({ error: 'Se requiere el nombre de la mascota y el id del héroe para adoptar.' });
  }
  
  try {
    // Verificar que el usuario existe
    const user = await userRepository.findById(req.userId);
    console.log('Usuario encontrado:', user ? user.username : 'No encontrado');
    
    if (!user) {
      console.log('Error: Usuario no encontrado');
      return res.status(404).json({ error: 'Usuario no encontrado' });
    }
    
    // Buscar la mascota por nombre entre las disponibles
    const pets = await petService.getAllPets();
    console.log('Total mascotas:', pets.length);
    
    const petToAdopt = pets.find(pet => {
      if (pet.name !== petName) return false;
      
      const adoptedBy = pet.adoptedBy;
      const isAvailable = adoptedBy === null || 
             adoptedBy === undefined || 
             adoptedBy === 0 || 
             adoptedBy === '' || 
             (typeof adoptedBy === 'string' && adoptedBy.trim() === '');
      
      console.log(`Mascota ${pet.name}: adoptedBy=${adoptedBy}, isAvailable=${isAvailable}`);
      return isAvailable;
    });
    
    console.log('Mascota a adoptar:', petToAdopt ? petToAdopt.name : 'No encontrada');
    
    if (!petToAdopt) {
      console.log('Error: Mascota no encontrada o ya adoptada');
      return res.status(404).json({ error: 'Mascota no encontrada o ya adoptada' });
    }
    
    // Adoptar la mascota (vincular al héroe)
    console.log('Intentando adoptar mascota ID:', petToAdopt.id);
    const pet = await petService.adoptPet(petToAdopt.id, heroId);
    console.log('Mascota adoptada exitosamente:', pet.name);
    
    // Vincular la mascota al usuario
    await userRepository.setMascotaId(req.userId, petToAdopt.id);
    console.log('Mascota vinculada al usuario');
    
    res.json(pet);
  } catch (error) {
    console.error('Error en adopción:', error);
    res.status(400).json({ error: error.message });
  }
});

// Mascotas disponibles (sin dueño)
router.get('/pets/disponibles', async (req, res) => {
  try {
    const pets = await petService.getAllPets();
    
    // Filtro más robusto que maneja null, undefined, 0, y strings vacíos
    const disponibles = pets.filter(p => {
      const adoptedBy = p.adoptedBy;
      return adoptedBy === null || 
             adoptedBy === undefined || 
             adoptedBy === 0 || 
             adoptedBy === '' || 
             (typeof adoptedBy === 'string' && adoptedBy.trim() === '');
    });
    
    res.json(disponibles.map(p => ({ id: p.id, name: p.name, alias: p.alias })));
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

export default router; 