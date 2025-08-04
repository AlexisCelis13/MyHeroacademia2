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

async function cleanupDuplicates() {
  try {
    await mongoose.connect(MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true });
    console.log('🔗 Conectado a MongoDB Atlas');

    console.log('\n=== PASO 1: IDENTIFICANDO DUPLICADOS ===');
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

    let totalDuplicates = 0;
    const heroesToRemove = [];

    // Identificar duplicados
    for (const [name, heroList] of Object.entries(heroesByName)) {
      if (heroList.length > 1) {
        console.log(`\n📋 Nombre: "${name}" - ${heroList.length} copias encontradas`);
        console.log(`✅ Manteniendo la primera copia (ID: ${heroList[0].id})`);
        
        // Agregar todos excepto el primero a la lista de eliminación
        for (let i = 1; i < heroList.length; i++) {
          heroesToRemove.push(heroList[i]._id);
          console.log(`🗑️  Eliminando ID: ${heroList[i].id}`);
        }
        totalDuplicates += heroList.length - 1;
      }
    }

    if (heroesToRemove.length === 0) {
      console.log('\n🎉 ¡No se encontraron héroes duplicados!');
      console.log('✅ La base de datos ya está limpia.');
      return;
    }

    console.log(`\n📊 Total de héroes duplicados a eliminar: ${heroesToRemove.length}`);

    console.log('\n=== PASO 2: ELIMINANDO DUPLICADOS ===');
    
    // Eliminar duplicados
    const result = await Hero.deleteMany({ _id: { $in: heroesToRemove } });
    console.log(`✅ Eliminación completada: ${result.deletedCount} héroes eliminados`);

    // Verificar resultado final
    const finalCount = await Hero.countDocuments();
    console.log(`📈 Total de héroes después de la limpieza: ${finalCount}`);

    console.log('\n=== PASO 3: AGREGANDO ÍNDICE ÚNICO ===');
    
    // Verificar si ya existe un índice único en el campo name
    const indexes = await Hero.collection.indexes();
    const nameIndexExists = indexes.some(index => 
      index.key && index.key.name === 1 && index.unique === true
    );

    if (nameIndexExists) {
      console.log('✅ El índice único en el campo "name" ya existe');
    } else {
      // Crear índice único en el campo name
      console.log('🔧 Creando índice único en el campo "name"...');
      await Hero.collection.createIndex({ name: 1 }, { unique: true });
      console.log('✅ Índice único creado exitosamente');
    }

    console.log('\n🎉 ¡Limpieza completada exitosamente!');
    console.log('✅ A partir de ahora, no se podrán agregar héroes con nombres duplicados.');

  } catch (error) {
    if (error.code === 11000) {
      console.error('❌ Error: No se puede crear el índice único porque aún existen nombres duplicados.');
      console.log('🔄 Ejecuta este script nuevamente para completar la limpieza.');
    } else {
      console.error('❌ Error:', error);
    }
  } finally {
    await mongoose.disconnect();
    console.log('🔌 Desconectado de MongoDB');
  }
}

cleanupDuplicates(); 