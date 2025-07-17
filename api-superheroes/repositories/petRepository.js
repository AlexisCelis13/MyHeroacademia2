import Pet from '../models/petSchema.js';

async function getPets() {
  return await Pet.find();
}

async function getPetById(id) {
  return await Pet.findOne({ id: parseInt(id) });
}

async function addPet(pet) {
  // Asigna un id incremental
  const lastPet = await Pet.findOne().sort({ id: -1 });
  const newId = lastPet ? lastPet.id + 1 : 1;
  pet.id = newId;
  const newPet = new Pet(pet);
  await newPet.save();
  return newPet;
}

async function updatePet(id, updatedPet) {
  return await Pet.findOneAndUpdate({ id: parseInt(id) }, updatedPet, { new: true });
}

async function deletePet(id) {
  return await Pet.deleteOne({ id: parseInt(id) });
}

export default {
  getPets,
  getPetById,
  addPet,
  updatePet,
  deletePet
}; 