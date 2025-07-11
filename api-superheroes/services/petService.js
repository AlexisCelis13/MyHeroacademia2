import petRepository from '../repositories/petRepository.js';

async function getAllPets() {
  return await petRepository.getPets();
}

async function addPet(pet) {
  if (!pet.name || !pet.alias) {
    throw new Error('La mascota debe tener un nombre y un alias.');
  }
  const pets = await petRepository.getPets();
  const newId = pets.length > 0 ? Math.max(...pets.map(p => p.id)) + 1 : 1;
  const newPet = { ...pet, id: newId };
  pets.push(newPet);
  await petRepository.savePets(pets);
  return newPet;
}

async function updatePet(id, updatedPet) {
  const pets = await petRepository.getPets();
  const index = pets.findIndex(pet => pet.id === parseInt(id));
  if (index === -1) {
    throw new Error('Mascota no encontrada');
  }
  delete updatedPet.id;
  pets[index] = { ...pets[index], ...updatedPet };
  await petRepository.savePets(pets);
  return pets[index];
}

async function deletePet(id) {
  const pets = await petRepository.getPets();
  const index = pets.findIndex(pet => pet.id === parseInt(id));
  if (index === -1) {
    throw new Error('Mascota no encontrada');
  }
  const filteredPets = pets.filter(pet => pet.id !== parseInt(id));
  await petRepository.savePets(filteredPets);
  return { message: 'Mascota eliminada' };
}

async function findPetsByCity(city) {
  const pets = await petRepository.getPets();
  return pets.filter(pet => pet.city.toLowerCase() === city.toLowerCase());
}

async function faceVillain(petId, villain) {
  const pets = await petRepository.getPets();
  const pet = pets.find(pet => pet.id === parseInt(petId));
  if (!pet) {
    throw new Error('Mascota no encontrada');
  }
  return `${pet.alias} enfrenta a ${villain}`;
}

async function adoptPet(petId, heroId) {
  const pets = await petRepository.getPets();
  const index = pets.findIndex(pet => pet.id === parseInt(petId));
  if (index === -1) {
    throw new Error('Mascota no encontrada');
  }
  if (pets[index].adoptedBy !== null) {
    throw new Error('La mascota ya está adoptada');
  }
  pets[index].adoptedBy = parseInt(heroId);
  await petRepository.savePets(pets);
  return pets[index];
}

async function unadoptPet(petId, heroId) {
  const pets = await petRepository.getPets();
  const index = pets.findIndex(pet => pet.id === parseInt(petId));
  if (index === -1) {
    throw new Error('Mascota no encontrada');
  }
  if (pets[index].adoptedBy !== parseInt(heroId)) {
    throw new Error('Solo el héroe que adoptó la mascota puede desadoptarla');
  }
  pets[index].adoptedBy = null;
  await petRepository.savePets(pets);
  return pets[index];
}

export default {
  getAllPets,
  addPet,
  updatePet,
  deletePet,
  findPetsByCity,
  faceVillain,
  adoptPet,
  unadoptPet
}; 