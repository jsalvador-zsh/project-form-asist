// src/app/components/TablaRegistros.tsx
"use client";

import { useState, useEffect } from 'react';
import axios from 'axios';

interface User {
  nombres: string;
  colegio: string;
  nroInvitados: string;
}

export default function TablaRegistros() {
  const [users, setUsers] = useState<User[]>([]);

  useEffect(() => {
    async function fetchData() {
      const response = await axios.get('/api/users'); // Asegúrate de tener una API para obtener los usuarios
      setUsers(response.data);
    }
    fetchData();
  }, []);

  return (
    <div className="w-full max-w-4xl mx-auto bg-white dark:bg-gray-800 rounded-lg shadow-md p-8">
      <h1 className="text-2xl font-bold text-center text-gray-800 dark:text-white mb-6">Registros de Asistencia</h1>
      <table className="min-w-full table-auto">
        <thead>
          <tr>
            <th className="px-4 py-2 text-left text-gray-700 dark:text-gray-300">Nombre</th>
            <th className="px-4 py-2 text-left text-gray-700 dark:text-gray-300">Colegio</th>
            <th className="px-4 py-2 text-left text-gray-700 dark:text-gray-300">Nro Invitados</th>
            <th className="px-4 py-2 text-left text-gray-700 dark:text-gray-300">Asistencia</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user, index) => (
            <tr key={index}>
              <td className="border px-4 py-2 text-gray-700 dark:text-gray-300">{user.nombres}</td>
              <td className="border px-4 py-2 text-gray-700 dark:text-gray-300">{user.colegio}</td>
              <td className="border px-4 py-2 text-gray-700 dark:text-gray-300">{user.nroInvitados}</td>
              <td className="border px-4 py-2 text-gray-700 dark:text-gray-300">
                <input type="checkbox" />
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
