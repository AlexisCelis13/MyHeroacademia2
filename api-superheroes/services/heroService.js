import heroRepository from '../repositories/heroRepository.js';
import petService from './petService.js';

async function getAllHeroes() {
  const heroes = await heroRepository.getHeroes();
  const pets = await petService.getAllPets();
  return heroes.map(hero => {
    const pet = pets.find(p => p.adoptedBy === hero.id) || null;
    return { ...hero.toObject(), pet };
  });
}

async function addHero(hero) {
  if (!hero.name || !hero.alias) {
    throw new Error('El héroe debe tener un nombre y un alias.');
  }
  return await heroRepository.addHero(hero);
}

async function updateHero(id, updatedHero) {
  return await heroRepository.updateHero(id, updatedHero);
}

async function deleteHero(id) {
  return await heroRepository.deleteHero(id);
}

async function findHeroesByCity(city) {
  const heroes = await heroRepository.getHeroes();
  return heroes.filter(hero => hero.city.toLowerCase() === city.toLowerCase());
}

async function faceVillain(heroId, villain) {
  const hero = await heroRepository.getHeroById(heroId);
  if (!hero) {
    throw new Error('Héroe no encontrado');
  }
  return `${hero.alias} enfrenta a ${villain}`;
}

export default {
  getAllHeroes,
  addHero,
  updateHero,
  deleteHero,
  findHeroesByCity,
  faceVillain
};
