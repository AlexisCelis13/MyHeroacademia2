import express from 'express';
import { check, validationResult } from 'express-validator';
import heroService from '../services/heroService.js';
import Hero from '../models/heroModel.js';

const router = express.Router();

router.get('/heroes', async (req, res) => {
  try {
    const heroes = await heroService.getAllHeroes();
    res.json(heroes);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

router.post('/heroes',
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
      const newHero = new Hero(null, name, alias, city, team);
      const addedHero = await heroService.addHero(newHero);
      res.status(201).json(addedHero);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }
);

router.put('/heroes/:id', async (req, res) => {
  try {
    const updatedHero = await heroService.updateHero(req.params.id, req.body);
    res.json(updatedHero);
  } catch (error) {
    res.status(404).json({ error: error.message });
  }
});

router.delete('/heroes/:id', async (req, res) => {
  try {
    await heroService.deleteHero(req.params.id);
    res.status(204).send();
  } catch (error) {
    res.status(404).json({ error: error.message });
  }
});

// ENDPOINT PARA HÉROES DISPONIBLES (SIN MASCOTAS)
router.get('/heroes/disponibles', async (req, res) => {
  try {
    const heroes = await heroService.getAllHeroes();
    const pets = await (await import('../services/petService.js')).default.getAllPets();
    
    // Filtrar héroes que no tienen mascotas adoptadas
    const disponibles = heroes.filter(hero => {
      return !pets.some(pet => pet.adoptedBy === hero.id);
    });
    
    res.json(disponibles.map(h => ({ id: h.id, name: h.name, alias: h.alias, city: h.city })));
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

router.get('/heroes/city/:city', async (req, res) => {
  try {
    const heroes = await heroService.findHeroesByCity(req.params.city);
    res.json(heroes);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

router.post('/heroes/:id/enfrentar', async (req, res) => {
  try {
    const result = await heroService.faceVillain(req.params.id, req.body.villain);
    res.json({ message: result });
  } catch (error) {
    res.status(404).json({ error: error.message });
  }
});

// ENDPOINT PARA VER MASCOTAS DE UN SUPERHÉROE
router.get('/heroes/:id/mascotas', async (req, res) => {
  try {
    const pets = await (await import('../services/petService.js')).default.getAllPets();
    const mascota = pets.find(pet => pet.adoptedBy === parseInt(req.params.id)) || null;
    res.json(mascota);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

export default router;
