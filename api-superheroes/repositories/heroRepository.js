import Hero from '../models/heroSchema.js';

async function getHeroes() {
  return await Hero.find();
}

async function getHeroById(id) {
  return await Hero.findOne({ id: parseInt(id) });
}

async function addHero(hero) {
  // Asigna un id incremental
  const lastHero = await Hero.findOne().sort({ id: -1 });
  const newId = lastHero ? lastHero.id + 1 : 1;
  hero.id = newId;
  const newHero = new Hero(hero);
  await newHero.save();
  return newHero;
}

async function updateHero(id, updatedHero) {
  return await Hero.findOneAndUpdate({ id: parseInt(id) }, updatedHero, { new: true });
}

async function deleteHero(id) {
  return await Hero.deleteOne({ id: parseInt(id) });
}

export default {
  getHeroes,
  getHeroById,
  addHero,
  updateHero,
  deleteHero
};
