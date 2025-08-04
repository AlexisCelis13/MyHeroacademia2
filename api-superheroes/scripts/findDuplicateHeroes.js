import mongoose from 'mongoose';
import '../db.js';

const MONGO_URI = 'mongodb+srv://alexcelischi123:NWV90DuaFVM0X0SG@apijs.04sz8by.mongodb.net/?retryWrites=true&w=majority&appName=Apijs';

// Definir el esquema para poder usar el modelo
const heroSchema = new mongoose.Schema({
  id: Number,
  name: String,
  alias: String,
  city: String,
  team: String
});

const Hero = mongoose.model('Hero', heroSchema);

async function findDuplicateHeroes() {
  try {
    await mongoose.connect(MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true });
    console.log('Conectado a MongoDB Atlas');

    // Obtener todos los héroes
    const heroes = await Hero.find();
    console.log(`Total de héroes en la base de datos: ${heroes.length}`);

    // Agrupar por nombre para encontrar duplicados
    const heroesByName = {};
    heroes.forEach(hero => {
      if (!heroesByName[hero.name]) {
        heroesByName[hero.name] = [];
      }
      heroesByName[hero.name].push(hero);
    });

    // Mostrar duplicados
    console.log('\n=== HÉROES DUPLICADOS ===');
    let totalDuplicates = 0;
    for (const [name, heroList] of Object.entries(heroesByName)) {
      if (heroList.length > 1) {
        console.log(`\nNombre: "${name}" - ${heroList.length} copias:`);
        heroList.forEach((hero, index) => {
          console.log(`  ${index + 1}. ID: ${hero.id}, Alias: ${hero.alias}, Ciudad: ${hero.city}, Equipo: ${hero.team}`);
        });
        totalDuplicates += heroList.length - 1;
      }
    }

    if (totalDuplicates === 0) {
      console.log('\n¡No se encontraron héroes duplicados!');
    } else {
      console.log(`\nTotal de duplicados encontrados: ${totalDuplicates}`);
    }

  } catch (error) {
    console.error('Error:', error);
  } finally {
    await mongoose.disconnect();
    console.log('Desconectado de MongoDB');
  }
}

findDuplicateHeroes(); 