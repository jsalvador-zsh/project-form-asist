// src/models/User.ts
import mongoose from 'mongoose';

const UserSchema = new mongoose.Schema({
  nombres: String,
  colegio: String,
  edad: Number,
  mensaje: String,
  nroInvitados: Number,
  image: String,
});

const User = mongoose.models.User || mongoose.model('User', UserSchema);

export default User;