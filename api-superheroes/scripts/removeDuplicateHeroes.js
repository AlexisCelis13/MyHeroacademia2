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

async function removeDuplicateHeroes() {
  try {
    await mongoose.connect(MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true });
    console.log('Conectado a MongoDB Atlas');

    // Obtener todos los héroes
    const heroes = await Hero.find().sort({ id: 1 });
    console.log(`Total de héroes en la base de datos: ${heroes.length}`);

    // Agrupar por nombre para encontrar duplicados
    const heroesByName = {};
    heroes.forEach(hero => {
      if (!heroesByName[hero.name]) {
        heroesByName[hero.name] = [];
      }
      heroesByName[hero.name].push(hero);
    });

    let totalRemoved = 0;
    const heroesToRemove = [];

    // Identificar duplicados para eliminar (mantener el primero, eliminar el resto)
    for (const [name, heroList] of Object.entries(heroesByName)) {
      if (heroList.length > 1) {
        console.log(`\nNombre: "${name}" - ${heroList.length} copias encontradas`);
        console.log(`Manteniendo la primera copia (ID: ${heroList[0].id})`);
        
        // Agregar todos excepto el primero a la lista de eliminación
        for (let i = 1; i < heroList.length; i++) {
          heroesToRemove.push(heroList[i]._id);
          console.log(`  Eliminando ID: ${heroList[i].id}`);
        }
        totalRemoved += heroList.length - 1;
      }
    }

    if (heroesToRemove.length === 0) {
      console.log('\n¡No se encontraron héroes duplicados para eliminar!');
      return;
    }

    console.log(`\nTotal de héroes a eliminar: ${heroesToRemove.length}`);
    
    // Confirmar antes de eliminar
    console.log('\n¿Deseas proceder con la eliminación? (s/n)');
    // En un entorno real, aquí podrías usar readline para confirmación interactiva
    // Por ahora, procedemos directamente
    
    // Eliminar duplicados
    const result = await Hero.deleteMany({ _id: { $in: heroesToRemove } });
    console.log(`\n✅ Eliminación completada: ${result.deletedCount} héroes eliminados`);

    // Verificar resultado final
    const finalCount = await Hero.countDocuments();
    console.log(`\nTotal de héroes después de la limpieza: ${finalCount}`);

  } catch (error) {
    console.error('Error:', error);
  } finally {
    await mongoose.disconnect();
    console.log('Desconectado de MongoDB');
  }
}

removeDuplicateHeroes(); 