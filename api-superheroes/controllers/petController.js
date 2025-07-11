import express from 'express';
import { check, validationResult } from 'express-validator';
import petService from '../services/petService.js';
import Pet from '../models/petModel.js';

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

export default router; 