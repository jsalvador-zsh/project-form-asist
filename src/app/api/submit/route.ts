import mongoose from 'mongoose';
import { NextResponse } from 'next/server';

// Conectar a MongoDB si no está ya conectado
async function connectDB() {
  if (mongoose.connection.readyState !== 1) {
    await mongoose.connect(process.env.MONGODB_URI!, {
      serverSelectionTimeoutMS: 5000, // Tiempo de espera para la conexión
    });
    console.log('Conectado a MongoDB Atlas');
  }
}

// Definir el esquema y el modelo de usuario
const UserSchema = new mongoose.Schema({
  nombres: String,
  colegio: String,
  edad: Number,
  mensaje: String,
  image: String,
});

// Prevenir la redefinición del modelo en desarrollos con hot reload
const User = mongoose.models.User || mongoose.model('User', UserSchema);

export async function POST(req: Request) {
  await connectDB();

  try {
    const data = await req.formData();
    const nombres = data.get('nombres');
    const colegio = data.get('colegio');
    const edad = data.get('edad');
    const mensaje = data.get('mensaje');
    const image = data.get('image'); // Aquí puedes manejar el archivo de imagen

    // Crear un nuevo usuario con los datos recibidos
    const newUser = new User({
      nombres,
      colegio,
      edad,
      mensaje,
      image, // Lógica para manejar la imagen (Cloudinary o similar)
    });

    await newUser.save();
    return NextResponse.json({ message: 'Usuario creado exitosamente' });
  } catch (error) {
    console.error('Error al crear el usuario:', error);
    return NextResponse.json({ message: 'Error al crear el usuario' }, { status: 500 });
  }
}
