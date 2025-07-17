import mongoose from 'mongoose';

const petSchema = new mongoose.Schema({
  id: Number,
  name: String,
  alias: String,
  city: String,
  team: String,
  adoptedBy: Number,
  felicidad: { type: Number, default: 100 },
  hambre: { type: Number, default: 0 },
  enfermedad: { type: String, default: null },
  itemsCustom: { type: [String], default: [] },
  viva: { type: Boolean, default: true },
  historial: { type: [String], default: [] },
  vida: { type: Number, default: 100 },
  enfermoDesde: { type: Number, default: null },
  recuperandoDesde: { type: Number, default: null },
  decaimientoDesde: { type: Number, default: null }
});

export default mongoose.model('Pet', petSchema); 