"use client";

import React, { useState } from 'react';
import { validateRegistration } from "@/app/lib/validations/registerValidations"
import { useStore } from '@/app/lib/store/store';
import WavingHandIcon from '@mui/icons-material/WavingHand';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
interface Errors {
    username?: string;
    password?: string;
    confirmPassword?: string;
    email?: string;
    phoneNumber?: string;
}
  

const Register: React.FC = () => {
    const router = useRouter(); // Inicializa useRouter
    const { register } = useStore();
    const [formData, setFormData] = useState({
        username: "",
        email: "",
        phoneNumber: "",
        password: "",
        confirmPassword: "",
    })

    const [errors, setErrors] = useState<Errors>({});

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
        setErrors(validateRegistration({ formData: { ...formData, [name]: value } }));
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        if (Object.keys(errors).length > 0) {
            setErrors(errors);
            toast.error('Por favor, corrija los errores antes de continuar', {
                autoClose: 1500
            })
            return;
        }

        const result = await register(formData);

        if (result.success) {
            toast.success('Usuario registrado exitosamente', {
                autoClose: 1500
            });
            router.push('/login'); // Redirige al usuario a la página de login
        } else {
            toast.error(`Error en el registro: ${result.error}`, {
                autoClose: 1500
            });
        }
    };

    return (
        <div className="flex flex-col lg:flex-row justify-center items-center h-full pt-36 lg:pt-0 lg:h-screen  bg-gradient-to-t
                             from-blue-600/30 from-10% via-indigo-500/20 via-20% to-slate-300/20 to-90%">
            <form onSubmit={handleSubmit} className='bg-white p-10 rounded-xl flex flex-col justify-center items-center w-[500px] h-[600px] border-y-8 border-slate-500 shadow-md '>
                <div className='flex flex-col w-3/4 h-1/5 relative '>
                    <label className="font-semibold">Nombre de usuario:</label>
                    <input
                        className='border-2 border-slate-300 rounded-md focus:border-blue-500'
                        name="username"
                        value={formData.username}
                        onChange={handleChange}
                        required
                    />
                    {errors && <p style={{ color: 'red', fontSize: '14px', }}>{errors.username}</p>}
                </div>

                <div className='flex flex-col w-3/4 h-1/5'>
                    <label className="font-semibold">Email:</label>
                    <input
                        className='border-2 border-slate-300 rounded-md'
                        type="email"
                        name='email'
                        value={formData.email}
                        onChange={handleChange}
                        required
                    />
                    {errors && <p style={{ color: 'red', fontSize: '14px', }}>{errors.email}</p>}
                </div>

                <div className='flex flex-col w-3/4 h-1/5'>
                    <label className="font-semibold">Número de teléfono:</label>
                    <input
                        className='border-2 border-slate-300 rounded-md'
                        type="number"
                        name='phoneNumber'
                        value={formData.phoneNumber}
                        onChange={handleChange}
                        required
                    />
                    {errors && <p style={{ color: 'red', fontSize: '14px', }}>{errors.phoneNumber}</p>}
                </div>

                <div className='flex flex-col w-3/4 h-1/5'>
                    <label className="font-semibold">Contraseña:</label>
                    <input
                        className='border-2 border-slate-300 rounded-md'
                        type="password"
                        name='password'
                        value={formData.password}
                        onChange={handleChange}
                        required
                    />
                    {errors && <p style={{ color: 'red ' }}>{errors.password}</p>}
                </div>

                <div className='flex flex-col w-3/4 h-1/5'>
                    <label className="font-semibold">Confirm Password:</label>
                    <input
                        className='border-2 border-slate-300 rounded-md'
                        type="password"
                        name='confirmPassword'
                        value={formData.confirmPassword}
                        onChange={handleChange}
                        required
                    />
                    {errors && <p style={{ color: 'red', fontSize: '14px', }}>{errors.confirmPassword}</p>}
                </div>


                <button className='bg-indigo-400 mt-3 hover:bg-indigo-700 transition-all text-white font-bold py-2 px-4 rounded' type="submit">Registrarse</button>
            </form>

            <div className='lg:self-end mb-48 lg:ml-10 mt-5 lg:mt-0 bg-white p-10 rounded-xl flex flex-col justify-center items-center border-l-2 border-slate-500 shadow-md'>
                <p className='font-semibold text-lg'>¡Ya tengo una cuenta! <WavingHandIcon className='text-slate-400' /> </p>
                <Link className=' hover:text-indigo-400 transition-all mt-3  font-bold text-indigo-500' href="/login">Inicia sesión</Link>
            </div>



        </div>
    );
};

export default Register;
