import mongoose from 'mongoose';
import { NextResponse } from 'next/server';
import User from '@/models/User'; // Asegúrate de que la ruta sea correcta

async function connectDB() {
  if (mongoose.connection.readyState !== 1) {
    await mongoose.connect(process.env.MONGODB_URI!, {
      serverSelectionTimeoutMS: 3000,
    });
    console.log('Conectado a MongoDB Atlas');
  }
}

export async function POST(req: Request) {
  await connectDB();

  try {
    const data = await req.formData();
    const nombres = data.get('nombres');
    const colegio = data.get('colegio');
    const edad = data.get('edad');
    const nroInvitados = parseInt(data.get('nroInvitados') as string, 10); // Convertir a número
    const mensaje = data.get('mensaje');
    const image = data.get('image');

    // Crear un nuevo usuario con los datos recibidos
    const newUser = new User({
      nombres,
      colegio,
      edad,
      nroInvitados,
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
