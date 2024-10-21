"use client";

import { Toaster } from 'react-hot-toast';
import Formulario from './components/Formulario';
import Link from 'next/link';
import Header from './components/Header';
import Countdown from './components/Countdown';

export default function Home() {
  return (
    <div className="min-h-screen bg-gray-100">
      <Header />
      <Countdown />
      <Toaster position="top-right" />
      <Formulario />
      
      {/* Botón centrado */}
      <div className="flex justify-center mt-6">
        <Link href="/registros">
          <button className="py-3 px-6 border border-transparent rounded-md shadow-sm text-white bg-primary hover:bg-primary focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary">
            Ver Registros
          </button>
        </Link>
      </div>
    </div>
  );
}
