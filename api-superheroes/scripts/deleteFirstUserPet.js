import { connectDB } from '../db.js';
import userRepository from '../repositories/userRepository.js';
import petRepository from '../repositories/petRepository.js';

// Script para eliminar la mascota del primer usuario registrado
(async () => {
  await connectDB();
  const user = await userRepository.getFirstUser();
  if (!user) {
    console.log('No hay usuarios registrados.');
    process.exit(0);
  }
  if (!user.mascotaId) {
    console.log('El primer usuario no tiene mascota asociada.');
    process.exit(0);
  }
  const pet = await petRepository.getPetById(user.mascotaId);
  if (!pet) {
    console.log('La mascota asociada no existe.');
    process.exit(0);
  }
  await petRepository.deletePet(pet.id);
  console.log(`Mascota con id ${pet.id} y nombre '${pet.name}' eliminada.`);
  process.exit(0);
})(); 