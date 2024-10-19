"use client"; // Asegurar que el componente es un Client Component

import { useState } from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import axios from 'axios';
import { toast, Toaster } from 'react-hot-toast'; // Importar react-hot-toast

// Esquema de validación con Yup
const FormSchema = Yup.object().shape({
  nombres: Yup.string().required('El nombre es requerido'),
  colegio: Yup.string().required('El colegio es requerido'),
  edad: Yup.number().required('La edad es requerida'),
  mensaje: Yup.string().required('El mensaje es requerido'),
});

export default function Home() {
  const [image, setImage] = useState<File | null>(null);

  const handleImageChange = (e: any) => {
    setImage(e.target.files[0]);
  };

  const handleSubmit = async (values: any, { resetForm }: any) => {
    const formData = new FormData();
    formData.append('nombres', values.nombres);
    formData.append('colegio', values.colegio);
    formData.append('edad', values.edad);
    formData.append('mensaje', values.mensaje);

    if (image) {
      formData.append('image', image); // Solo agregar si hay imagen
    }

    try {
      await axios.post('/api/submit', formData);
      toast.success('Formulario enviado exitosamente!'); // Mostrar notificación de éxito
      resetForm(); // Resetear el formulario
      setImage(null); // Limpiar el estado de la imagen
    } catch (error) {
      toast.error('Error al enviar el formulario. Inténtalo de nuevo.'); // Mostrar notificación de error
      console.error(error);
    }
  };

  return (
    <div className="px-4 md:px-4 lg:px-0 min-h-screen flex items-center justify-center bg-gray-100 dark:bg-gray-900 transition-colors">
      <div className="w-full max-w-lg bg-white dark:bg-gray-800 rounded-lg shadow-md p-8 space-y-6">
        <Toaster position="top-right" /> {/* Posición del Toast */}
        <h1 className="text-3xl font-bold text-center text-gray-800 dark:text-white">
          Formulario de Asistencia
        </h1>
        <Formik
          initialValues={{ nombres: '', colegio: '', edad: '', mensaje: '' }}
          validationSchema={FormSchema}
          onSubmit={handleSubmit}
        >
          {() => (
            <Form className="space-y-4">
              {/* Campo de Nombres */}
              <div>
                <label
                  htmlFor="nombres"
                  className="block text-sm font-medium text-gray-700 dark:text-gray-300"
                >
                  Nombres
                </label>
                <Field
                  id="nombres"
                  name="nombres"
                  className="mt-1 block w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 dark:bg-gray-700 dark:text-white"
                  placeholder="Ingresa tu nombre"
                />
                <ErrorMessage
                  name="nombres"
                  component="div"
                  className="text-sm text-red-600 mt-1"
                />
              </div>

              {/* Campo de Colegio */}
              <div>
                <label
                  htmlFor="colegio"
                  className="block text-sm font-medium text-gray-700 dark:text-gray-300"
                >
                  Colegio
                </label>
                <Field
                  id="colegio"
                  name="colegio"
                  className="mt-1 block w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 dark:bg-gray-700 dark:text-white"
                  placeholder="Ingresa el nombre del colegio"
                />
                <ErrorMessage
                  name="colegio"
                  component="div"
                  className="text-sm text-red-600 mt-1"
                />
              </div>

              {/* Campo de Edad */}
              <div>
                <label
                  htmlFor="edad"
                  className="block text-sm font-medium text-gray-700 dark:text-gray-300"
                >
                  Edad
                </label>
                <Field
                  id="edad"
                  name="edad"
                  type="number"
                  className="mt-1 block w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 dark:bg-gray-700 dark:text-white"
                  placeholder="Ingresa tu edad"
                />
                <ErrorMessage
                  name="edad"
                  component="div"
                  className="text-sm text-red-600 mt-1"
                />
              </div>

              {/* Campo de Mensaje */}
              <div>
                <label
                  htmlFor="mensaje"
                  className="block text-sm font-medium text-gray-700 dark:text-gray-300"
                >
                  Mensaje
                </label>
                <Field
                  as="textarea"
                  id="mensaje"
                  name="mensaje"
                  className="mt-1 block w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 dark:bg-gray-700 dark:text-white"
                  placeholder="Ingresa un mensaje"
                />
                <ErrorMessage
                  name="mensaje"
                  component="div"
                  className="text-sm text-red-600 mt-1"
                />
              </div>

              {/* Campo para Subir Imagen */}
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                  Subir Imagen
                </label>
                <input
                  type="file"
                  onChange={handleImageChange}
                  className="mt-1 block w-full text-gray-900 dark:text-gray-100 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-indigo-600 file:text-white hover:file:bg-indigo-700"
                />
              </div>

              {/* Botón de Enviar */}
              <button
                type="submit"
                className="w-full py-3 px-4 border border-transparent rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
              >
                Enviar
              </button>
            </Form>
          )}
        </Formik>
      </div>
    </div>
  );
}
