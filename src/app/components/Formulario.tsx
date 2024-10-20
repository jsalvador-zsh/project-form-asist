// src/app/components/Formulario.tsx
"use client";

import { useState } from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import axios from 'axios';
import { toast, Toaster } from 'react-hot-toast';

const FormSchema = Yup.object().shape({
    nombres: Yup.string().required('El nombre es requerido'),
    colegio: Yup.string().required('El colegio es requerido'),
    edad: Yup.number().required('La edad es requerida'),
    nroInvitados: Yup.number().required('Número de invitados es requerido').min(0, 'Debe ser un número positivo'),
    mensaje: Yup.string().required('El mensaje es requerido'),
});

export default function Formulario() {
    const [image, setImage] = useState<File | null>(null);

    const handleImageChange = (e: any) => {
        setImage(e.target.files[0]);
    };

    const handleSubmit = async (values: any, { resetForm }: any) => {
        const formData = new FormData();
        formData.append('nombres', values.nombres);
        formData.append('colegio', values.colegio);
        formData.append('edad', values.edad);
        formData.append('nroInvitados', values.nroInvitados.toString());
        formData.append('mensaje', values.mensaje);

        if (image) {
            formData.append('image', image);
        }

        try {
            await axios.post('/api/submit', formData);
            toast.success('Formulario enviado exitosamente!');
            resetForm();
            setImage(null);
        } catch (error) {
            toast.error('Error al enviar el formulario. Inténtalo de nuevo.');
            console.error(error);
        }
    };

    return (
        <div className="my-16 px-4 md:px-4 lg:px-0 flex items-center justify-center">
            <div className="w-full max-w-lg bg-white dark:bg-gray-800 rounded-lg shadow-md p-8 space-y-6">
                <Toaster position="top-right" /> {/* Posición del Toast */}
                <h1 className="text-3xl font-bold text-center text-gray-800 dark:text-white">
                    Formulario de Asistencia
                </h1>
                <Formik
                    initialValues={{ nombres: '', colegio: '', edad: '', nroInvitados: 0, mensaje: '' }}
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
                                    className="mt-1 block w-full px-3 py-2 text-sm md:text-base border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:ring-accent focus:border-accent dark:bg-gray-700 dark:text-white"
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
                                    className="mt-1 block w-full px-3 py-2 text-sm md:text-base border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:ring-accent focus:border-accent dark:bg-gray-700 dark:text-white"
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
                                    className="mt-1 block w-full px-3 py-2 text-sm md:text-base border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:ring-accent focus:border-accent dark:bg-gray-700 dark:text-white"
                                    placeholder="Ingresa tu edad"
                                />
                                <ErrorMessage
                                    name="edad"
                                    component="div"
                                    className="text-sm text-red-600 mt-1"
                                />
                            </div>
                            {/* Campo de Número de Invitados */}
                            <div>
                              <label
                                    htmlFor="nroInvitados"
                                    className="block text-sm font-medium text-gray-700 dark:text-gray-300"
                                >
                                    Número de Invitados
                                </label>
                                <Field
                                    id="nroInvitados"
                                    name="nroInvitados"
                                    type="number"
                                    className="mt-1 block w-full px-3 py-2 text-sm md:text-base border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:ring-accent focus:border-accent dark:bg-gray-700 dark:text-white"
                                    placeholder="Ingresa tu nro. de invitados"
                                />
                                <ErrorMessage
                                    name="nroInvitados"
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
                                    className="mt-1 block w-full px-3 py-2 text-sm md:text-base border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:ring-accent focus:border-accent dark:bg-gray-700 dark:text-white"
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
                                    className="mt-1 block w-full text-xs md:text-base text-gray-900 dark:text-gray-100 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-xs md:file:text-sm file:font-semibold file:bg-accent file:text-white hover:file:bg-accent"
                                />
                            </div>

                            {/* Botón de Enviar */}
                            <button
                                type="submit"
                                className="w-full py-3 px-4 text-sm md:text-base border border-transparent rounded-md shadow-sm text-white bg-accent hover:bg-accent focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-accent"
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
