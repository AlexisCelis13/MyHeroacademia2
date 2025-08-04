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

async function addUniqueIndex() {
  try {
    await mongoose.connect(MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true });
    console.log('Conectado a MongoDB Atlas');

    // Verificar si ya existe un índice único en el campo name
    const indexes = await Hero.collection.indexes();
    const nameIndexExists = indexes.some(index => 
      index.key && index.key.name === 1 && index.unique === true
    );

    if (nameIndexExists) {
      console.log('✅ El índice único en el campo "name" ya existe');
      return;
    }

    // Crear índice único en el campo name
    console.log('Creando índice único en el campo "name"...');
    await Hero.collection.createIndex({ name: 1 }, { unique: true });
    console.log('✅ Índice único creado exitosamente');

    console.log('\nA partir de ahora, no se podrán agregar héroes con nombres duplicados.');

  } catch (error) {
    if (error.code === 11000) {
      console.error('❌ Error: No se puede crear el índice único porque ya existen nombres duplicados.');
      console.log('Primero debes eliminar los duplicados usando el script removeDuplicateHeroes.js');
    } else {
      console.error('Error:', error);
    }
  } finally {
    await mongoose.disconnect();
    console.log('Desconectado de MongoDB');
  }
}

addUniqueIndex(); 