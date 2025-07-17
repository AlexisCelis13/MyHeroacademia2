import mongoose from 'mongoose';

const heroSchema = new mongoose.Schema({
  id: Number,
  name: String,
  alias: String,
  city: String,
  team: String
});

export default mongoose.model('Hero', heroSchema); 