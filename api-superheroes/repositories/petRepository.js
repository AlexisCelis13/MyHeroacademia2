import fs from 'fs-extra';
import Pet from '../models/petModel.js';

const filePath = './pets.json';

async function getPets() {
  try {
    const data = await fs.readJson(filePath);
    return data.map(pet => new Pet(
      pet.id,
      pet.name,
      pet.alias,
      pet.city,
      pet.team,
      pet.adoptedBy,
      pet.felicidad !== undefined ? pet.felicidad : 100,
      pet.hambre !== undefined ? pet.hambre : 0,
      pet.enfermedad !== undefined ? pet.enfermedad : null,
      pet.itemsCustom !== undefined ? pet.itemsCustom : [],
      pet.viva !== undefined ? pet.viva : true,
      pet.historial !== undefined ? pet.historial : [],
      pet.vida !== undefined ? pet.vida : 100,
      pet.enfermoDesde !== undefined ? pet.enfermoDesde : null,
      pet.recuperandoDesde !== undefined ? pet.recuperandoDesde : null,
      pet.decaimientoDesde !== undefined ? pet.decaimientoDesde : null
    ));
  } catch (error) {
    console.error(error);
    return [];
  }
}

async function savePets(pets) {
  try {
    await fs.writeJson(filePath, pets);
  } catch (error) {
    console.error(error);
  }
}

export default {
  getPets,
  savePets
}; 