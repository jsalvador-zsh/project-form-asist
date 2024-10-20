import mongoose from 'mongoose';
import User from '@/models/User';
import { NextResponse } from 'next/server';

async function connectDB() {
  if (mongoose.connection.readyState !== 1) {
    await mongoose.connect(process.env.MONGODB_URI!, {
      serverSelectionTimeoutMS: 5000,
    });
  }
}

export async function GET() {
  await connectDB();

  try {
    // Obtener solo los campos 'nombres' y 'colegio'
    const users = await User.find({}, 'nombres colegio nroInvitados');
    return NextResponse.json(users);
  } catch (error) {
    console.error('Error al obtener los usuarios:', error);
    return NextResponse.json({ message: 'Error al obtener los usuarios' }, { status: 500 });
  }
}
