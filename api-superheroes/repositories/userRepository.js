import User from '../models/userSchema.js';

async function createUser(user) {
  const newUser = new User(user);
  await newUser.save();
  return newUser;
}

async function findByUsername(username) {
  return await User.findOne({ username });
}

async function findById(id) {
  return await User.findById(id);
}

async function setMascotaId(userId, mascotaId) {
  return await User.findByIdAndUpdate(userId, { mascotaId }, { new: true });
}

async function getFirstUser() {
  return await User.findOne().sort({ _id: 1 });
}

export default {
  createUser,
  findByUsername,
  findById,
  setMascotaId,
  getFirstUser
}; 