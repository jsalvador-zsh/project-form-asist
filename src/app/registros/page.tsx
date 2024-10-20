// src/app/registros/page.tsx
import TablaRegistros from '../components/TablaRegistros';
import Link from 'next/link';

export default function RegistrosPage() {
  return (
    <div className="min-h-screen bg-gray-100 dark:bg-gray-900 transition-colors">
      {/* Botón "Ir a inicio" alineado a la izquierda */}
      <div className="flex justify-start p-6">
        <Link href="/">
          <button className="py-3 px-4 border border-transparent rounded-md shadow-sm text-white bg-accent hover:bg-accent focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-accent">
            Ir a inicio
          </button>
        </Link>
      </div>
      
      {/* Tabla de Registros */}
      <div className="flex items-center justify-center">
        <TablaRegistros />
      </div>
    </div>
  );
}

