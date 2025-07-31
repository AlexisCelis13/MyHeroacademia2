import petRepository from '../repositories/petRepository.js';

async function getAllPets() {
  return await petRepository.getPets();
}

async function addPet(pet) {
  if (!pet.name || !pet.alias) {
    throw new Error('La mascota debe tener un nombre y un alias.');
  }
  return await petRepository.addPet(pet);
}

async function updatePet(id, updatedPet) {
  return await petRepository.updatePet(id, updatedPet);
}

async function deletePet(id) {
  return await petRepository.deletePet(id);
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
  // Verificar si el héroe ya tiene una mascota
  const alreadyAdopted = pets.find(pet => pet.adoptedBy === parseInt(heroId));
  if (alreadyAdopted) {
    throw new Error('Este superhéroe ya tiene una mascota.');
  }
  const pet = await petRepository.getPetById(petId);
  if (!pet) {
    throw new Error('Mascota no encontrada');
  }
  if (pet.adoptedBy !== null) {
    throw new Error('La mascota ya está adoptada');
  }
  
  // Resetear el estado de la mascota al adoptarla
  pet.adoptedBy = parseInt(heroId);
  pet.vida = 100;
  pet.felicidad = 100;
  pet.hambre = 0;
  pet.enfermedad = null;
  pet.viva = true;
  pet.enfermoDesde = null;
  pet.recuperandoDesde = null;
  pet.decaimientoDesde = Date.now(); // Resetear el decaimiento
  
  await petRepository.updatePet(petId, pet);
  return pet;
}

async function unadoptPet(petId, heroId) {
  const pet = await petRepository.getPetById(petId);
  if (!pet) {
    throw new Error('Mascota no encontrada');
  }
  if (pet.adoptedBy !== parseInt(heroId)) {
    throw new Error('Solo el héroe que adoptó la mascota puede desadoptarla');
  }
  pet.adoptedBy = null;
  await petRepository.updatePet(petId, pet);
  return pet;
}

// --- LÓGICA DEL JUEGO DE MASCOTAS ---

// Utilidad para descontar vida según enfermedad y tiempo
function descontarVidaSiEnferma(pet) {
  if (!pet.enfermedad || !pet.enfermoDesde || !pet.viva) return;
  const ahora = Date.now();
  const msTranscurridos = ahora - pet.enfermoDesde;
  const intervalos = Math.floor(msTranscurridos / 35000); // cada 35s
  if (intervalos <= 0) return;
  let perdida = 0;
  switch (pet.enfermedad) {
    case 'Sarpullido': perdida = 5 * intervalos; break;
    case 'Gripa': perdida = 10 * intervalos; break;
    case 'Piel de Salchicha': perdida = 15 * intervalos; break;
    case 'Piojos de lata': perdida = 8 * intervalos; break;
    default: perdida = 0;
  }
  if (perdida > 0) {
    pet.vida = Math.max(0, pet.vida - perdida);
    pet.enfermoDesde = pet.enfermoDesde + intervalos * 35000;
    if (pet.vida === 0) {
      pet.viva = false;
      pet.historial.push('Murió por enfermedad');
    }
  }
}

// Utilidad para recuperar vida si está sana, llena y feliz
function recuperarVidaSiSana(pet) {
  if (!pet.viva || pet.enfermedad || pet.hambre > 0 || pet.felicidad < 80 || pet.vida >= 100) {
    pet.recuperandoDesde = null;
    return;
  }
  const ahora = Date.now();
  if (!pet.recuperandoDesde) pet.recuperandoDesde = ahora;
  const msTranscurridos = ahora - pet.recuperandoDesde;
  const intervalos = Math.floor(msTranscurridos / 15000); // cada 15s
  if (intervalos <= 0) return;
  const vidaGanada = 2 * intervalos;
  pet.vida = Math.min(100, pet.vida + vidaGanada);
  pet.recuperandoDesde = pet.recuperandoDesde + intervalos * 15000;
}

// Utilidad para decaimiento de felicidad y vida
function decaimientoFelicidadVida(pet) {
  if (!pet.viva) {
    pet.decaimientoDesde = null;
    return;
  }
  const ahora = Date.now();
  if (!pet.decaimientoDesde) pet.decaimientoDesde = ahora;
  const msTranscurridos = ahora - pet.decaimientoDesde;
  const intervalos = Math.floor(msTranscurridos / 120000); // cada 2 minutos (más lento)
  
  console.log('=== DECAIMIENTO FELICIDAD VIDA ===');
  console.log('msTranscurridos:', msTranscurridos, 'intervalos:', intervalos);
  console.log('Estado antes:', { vida: pet.vida, felicidad: pet.felicidad, viva: pet.viva });
  
  if (intervalos <= 0) return;
  
  let felicidadAntes = pet.felicidad;
  if (pet.felicidad > 0) {
    pet.felicidad = Math.max(0, pet.felicidad - 1 * intervalos); // Reducción más lenta
    console.log(`Felicidad reducida de ${felicidadAntes} a ${pet.felicidad}`);
  }
  
  // Si felicidad llegó a 0, vida baja más lentamente
  if (felicidadAntes > 0 && pet.felicidad === 0) {
    // Ajustar decaimientoDesde al momento en que felicidad llegó a 0
    const msParaCero = Math.ceil(felicidadAntes / 1) * 120000; // Más tiempo
    pet.decaimientoDesde = pet.decaimientoDesde + msParaCero;
    // Recalcular intervalos solo para vida
    const msTranscurridosVida = ahora - pet.decaimientoDesde;
    const intervalosVida = Math.floor(msTranscurridosVida / 120000);
    if (intervalosVida > 0) {
      pet.vida = Math.max(0, pet.vida - 2 * intervalosVida); // Reducción más lenta
      pet.decaimientoDesde = pet.decaimientoDesde + intervalosVida * 120000;
      console.log(`Vida reducida por felicidad 0: ${pet.vida}`);
    }
  } else if (pet.felicidad === 0) {
    // Si ya estaba en 0, solo baja vida más lentamente
    pet.vida = Math.max(0, pet.vida - 2 * intervalos); // Reducción más lenta
    pet.decaimientoDesde = pet.decaimientoDesde + intervalos * 120000;
    console.log(`Vida reducida (ya en 0): ${pet.vida}`);
  } else {
    pet.decaimientoDesde = pet.decaimientoDesde + intervalos * 120000;
  }
  
  // Solo marcar como muerta si la vida llega a 0 Y la felicidad también está en 0
  if (pet.vida === 0 && pet.felicidad === 0) {
    pet.viva = false;
    pet.historial.push('Murió por falta de felicidad y vida');
    console.log('Mascota marcada como muerta por vida y felicidad en 0');
  }
  
  console.log('Estado después:', { vida: pet.vida, felicidad: pet.felicidad, viva: pet.viva });
}

// Obtener estado de la mascota
async function getEstado(id, full = false) {
  const pet = await petRepository.getPetById(id);
  if (!pet) throw new Error('Mascota no encontrada');
  descontarVidaSiEnferma(pet);
  recuperarVidaSiSana(pet);
  decaimientoFelicidadVida(pet);
  await petRepository.updatePet(id, pet);
  if (full) return pet;
  return {
    felicidad: pet.felicidad,
    hambre: pet.hambre,
    enfermedad: pet.enfermedad,
    itemsCustom: pet.itemsCustom,
    viva: pet.viva,
    vida: pet.vida
  };
}

// Alimentar mascota
async function alimentar(id) {
  const pet = await petRepository.getPetById(id);
  if (!pet) throw new Error('Mascota no encontrada');
  if (!pet.viva) throw new Error('La mascota está muerta');
  if (pet.enfermedad) throw new Error('La mascota está enferma, primero debes curarla');
  
  console.log('=== ALIMENTAR MASCOTA ===');
  console.log('Estado inicial:', {
    vida: pet.vida,
    felicidad: pet.felicidad,
    hambre: pet.hambre,
    viva: pet.viva,
    decaimientoDesde: pet.decaimientoDesde
  });
  
  // Aplicar decaimiento solo después de verificar que la mascota está viva
  descontarVidaSiEnferma(pet);
  recuperarVidaSiSana(pet);
  decaimientoFelicidadVida(pet);
  
  console.log('Estado después del decaimiento:', {
    vida: pet.vida,
    felicidad: pet.felicidad,
    hambre: pet.hambre,
    viva: pet.viva
  });
  
  // Verificar nuevamente si la mascota sigue viva después del decaimiento
  if (!pet.viva) throw new Error('La mascota está muerta');
  
  if (pet.hambre <= 0) {
    pet.enfermedad = 'Gripa';
    pet.felicidad = Math.max(0, pet.felicidad - 10);
    pet.historial.push('Se enfermó de Gripa por sobrealimentación (llena)');
    pet.enfermoDesde = Date.now();
    pet.recuperandoDesde = null;
  } else if (pet.hambre >= 100) {
    pet.enfermedad = 'Gripa';
    pet.felicidad = Math.max(0, pet.felicidad - 10);
    pet.historial.push('Se enfermó de Gripa por sobrealimentación');
    pet.enfermoDesde = Date.now();
    pet.recuperandoDesde = null;
  } else {
    pet.hambre = Math.max(0, pet.hambre - 30);
    pet.felicidad = Math.min(100, pet.felicidad + 5);
    pet.historial.push('Alimentada');
    pet.decaimientoDesde = Date.now(); // reset decaimiento al subir felicidad
  }
  
  console.log('Estado después de alimentar:', {
    vida: pet.vida,
    felicidad: pet.felicidad,
    hambre: pet.hambre,
    viva: pet.viva
  });
  
  // Solo marcar como muerta si la felicidad llega a 0 después de la acción
  if (pet.felicidad === 0) {
    pet.viva = false;
    pet.historial.push('Murió por falta de felicidad');
    console.log('Mascota marcada como muerta por felicidad 0');
  }
  
  await petRepository.updatePet(id, pet);
  return pet;
}

// Pasear mascota
async function pasear(id) {
  const pet = await petRepository.getPetById(id);
  if (!pet) throw new Error('Mascota no encontrada');
  if (!pet.viva) throw new Error('La mascota está muerta');
  if (pet.enfermedad) throw new Error('La mascota está enferma, primero debes curarla');
  if (pet.felicidad >= 100) throw new Error('La mascota ya está al máximo de felicidad');
  
  // Aplicar decaimiento solo después de verificar que la mascota está viva
  descontarVidaSiEnferma(pet);
  recuperarVidaSiSana(pet);
  decaimientoFelicidadVida(pet);
  
  // Verificar nuevamente si la mascota sigue viva después del decaimiento
  if (!pet.viva) throw new Error('La mascota está muerta');
  
  pet.felicidad = Math.min(100, pet.felicidad + 10);
  pet.hambre = Math.min(100, pet.hambre + 10);
  pet.historial.push('Paseada');
  pet.decaimientoDesde = Date.now(); // reset decaimiento al subir felicidad
  if (pet.hambre > 100) {
    pet.enfermedad = 'Sarpullido';
    pet.felicidad = Math.max(0, pet.felicidad - 5);
    pet.historial.push('Se enfermó de Sarpullido por hambre excesiva');
    pet.enfermoDesde = Date.now();
    pet.recuperandoDesde = null;
  }
  
  // Solo marcar como muerta si la felicidad llega a 0 después de la acción
  if (pet.felicidad === 0) {
    pet.viva = false;
    pet.historial.push('Murió por falta de felicidad');
  }
  
  await petRepository.updatePet(id, pet);
  return pet;
}

// Jugar con mascota
async function jugar(id) {
  const pet = await petRepository.getPetById(id);
  if (!pet) throw new Error('Mascota no encontrada');
  if (!pet.viva) throw new Error('La mascota está muerta');
  if (pet.enfermedad) throw new Error('La mascota está enferma, primero debes curarla');
  if (pet.felicidad >= 100) throw new Error('La mascota ya está al máximo de felicidad');
  
  // Aplicar decaimiento solo después de verificar que la mascota está viva
  descontarVidaSiEnferma(pet);
  recuperarVidaSiSana(pet);
  decaimientoFelicidadVida(pet);
  
  // Verificar nuevamente si la mascota sigue viva después del decaimiento
  if (!pet.viva) throw new Error('La mascota está muerta');
  
  pet.felicidad = Math.min(100, pet.felicidad + 15);
  pet.hambre = Math.min(100, pet.hambre + 15);
  pet.historial.push('Jugó');
  pet.decaimientoDesde = Date.now(); // reset decaimiento al subir felicidad
  if (pet.hambre > 100) {
    pet.enfermedad = 'Piel de Salchicha';
    pet.felicidad = Math.max(0, pet.felicidad - 15);
    pet.historial.push('Se enfermó de Piel de Salchicha por hambre excesiva');
    pet.enfermoDesde = Date.now();
    pet.recuperandoDesde = null;
  }
  
  // Solo marcar como muerta si la felicidad llega a 0 después de la acción
  if (pet.felicidad === 0) {
    pet.viva = false;
    pet.historial.push('Murió por falta de felicidad');
  }
  
  await petRepository.updatePet(id, pet);
  return pet;
}

// Curar mascota
async function curar(id) {
  const pet = await petRepository.getPetById(id);
  if (!pet) throw new Error('Mascota no encontrada');
  if (!pet.viva) throw new Error('La mascota está muerta');
  if (!pet.enfermedad) throw new Error('La mascota no está enferma');
  
  // Aplicar decaimiento solo después de verificar que la mascota está viva
  descontarVidaSiEnferma(pet);
  recuperarVidaSiSana(pet);
  decaimientoFelicidadVida(pet);
  
  // Verificar nuevamente si la mascota sigue viva después del decaimiento
  if (!pet.viva) throw new Error('La mascota está muerta');
  
  pet.enfermedad = null;
  pet.enfermoDesde = null;
  pet.vida = 100;
  pet.recuperandoDesde = Date.now();
  pet.historial.push('Curada');
  await petRepository.updatePet(id, pet);
  return pet;
}

// Vestir mascota
async function vestir(id, item) {
  const pet = await petRepository.getPetById(id);
  if (!pet) throw new Error('Mascota no encontrada');
  if (!pet.viva) throw new Error('La mascota está muerta');
  
  // Aplicar decaimiento solo después de verificar que la mascota está viva
  descontarVidaSiEnferma(pet);
  recuperarVidaSiSana(pet);
  decaimientoFelicidadVida(pet);
  
  // Verificar nuevamente si la mascota sigue viva después del decaimiento
  if (!pet.viva) throw new Error('La mascota está muerta');
  
  pet.itemsCustom.push(item);
  pet.historial.push(`Vestida con ${item}`);
  await petRepository.updatePet(id, pet);
  return pet;
}

// Quitar accesorio de mascota
async function quitarAccesorio(id, item) {
  const pet = await petRepository.getPetById(id);
  if (!pet) throw new Error('Mascota no encontrada');
  if (!pet.viva) throw new Error('La mascota está muerta');
  
  // Aplicar decaimiento solo después de verificar que la mascota está viva
  descontarVidaSiEnferma(pet);
  recuperarVidaSiSana(pet);
  decaimientoFelicidadVida(pet);
  
  // Verificar nuevamente si la mascota sigue viva después del decaimiento
  if (!pet.viva) throw new Error('La mascota está muerta');
  
  // Verificar si el accesorio existe
  if (!pet.itemsCustom || !pet.itemsCustom.includes(item)) {
    throw new Error('La mascota no tiene ese accesorio');
  }
  
  // Remover el accesorio
  pet.itemsCustom = pet.itemsCustom.filter(accesorio => accesorio !== item);
  pet.historial.push(`Quitado accesorio: ${item}`);
  await petRepository.updatePet(id, pet);
  return pet;
}

// Obtener historial de acciones
async function getHistorial(id) {
  const pet = await petRepository.getPetById(id);
  descontarVidaSiEnferma(pet);
  recuperarVidaSiSana(pet);
  decaimientoFelicidadVida(pet);
  if (!pet) throw new Error('Mascota no encontrada');
  return pet.historial || [];
}

// Revivir mascota
async function revivir(id) {
  const pet = await petRepository.getPetById(id);
  if (!pet) throw new Error('Mascota no encontrada');
  if (pet.viva) throw new Error('La mascota ya está viva');
  pet.felicidad = 80;
  pet.vida = 70;
  pet.hambre = 30;
  pet.enfermedad = null;
  pet.enfermoDesde = null;
  pet.recuperandoDesde = null;
  pet.decaimientoDesde = Date.now();
  pet.viva = true;
  pet.historial.push('Tu mascota a revivido por las esferas del dragon');
  await petRepository.updatePet(id, pet);
  return pet;
}

export default {
  getAllPets,
  addPet,
  updatePet,
  deletePet,
  findPetsByCity,
  faceVillain,
  adoptPet,
  unadoptPet,
  // --- JUEGO ---
  getEstado,
  alimentar,
  pasear,
  jugar,
  curar,
  vestir,
  quitarAccesorio,
  getHistorial,
  revivir
}; 