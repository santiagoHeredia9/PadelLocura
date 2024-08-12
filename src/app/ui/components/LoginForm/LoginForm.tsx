"use client";

import React, { useState } from 'react';
import { validateLogin} from "@/app/lib/validations/loginValidations"
import { useStore } from '@/app/lib/store/store';
import WavingHandIcon from '@mui/icons-material/WavingHand';
import Link from 'next/link';
import { useRouter } from 'next/navigation';


const Login: React.FC = () => {
  const router = useRouter(); // Inicializa useRouter
  const { login } = useStore();
  const [formData, setFormData] = useState({
    username: "",
    password: "",

  })

  const [errors, setErrors] = useState({});

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
    setErrors(validateLogin({ formData: { ...formData, [name]: value } }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (Object.keys(errors).length > 0) {
      setErrors(errors);
      alert('Por favor, corrija los errores antes de continuar.');
      return;
    }

    console.log(formData);

    const result = await login(formData);
    if (result.success) {
      alert("Bienvenido!");
      localStorage.setItem('user', JSON.stringify(result.user));
      router.push('/dashboard-user'); // Redirige al usuario a la página de dashboard o a donde quieras
  } else {
      alert(`Error en el inicio de sesión: ${result.error}`);
  }
  };

  return (
    <div className="flex justify-center items-center h-screen bg-gradient-to-t
                             from-blue-600/30 from-10% via-indigo-500/20 via-20% to-slate-300/20 to-90%">
      <form onSubmit={handleSubmit} className='bg-white p-10 gap-8 rounded-xl flex flex-col justify-center items-center w-[500px] h-[400px] border-y-8 border-slate-500 shadow-md '>
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
          <label className="font-semibold">Contraseña:</label>
          <input
            className='border-2 border-slate-300 rounded-md'
            type="password"
            name='password'
            value={formData.password}
            onChange={handleChange}
            required
          />
          {errors && <p style={{ color: 'red', fontSize: '14px', }}>{errors.password}</p>}
        </div>

        <button className='bg-indigo-400 mt-3 hover:bg-indigo-700 transition-all text-white font-bold py-2 px-4 rounded' type="submit">Ingresar</button>
      </form>


      <div className='self-end mb-72 ml-10 bg-white p-10 rounded-xl flex flex-col justify-center items-center border-l-2 border-slate-500 shadow-md'>
        <p className='font-semibold text-lg'>No tengo una cuenta <WavingHandIcon className='text-slate-400' /> </p>
        <Link className=' hover:text-indigo-400 transition-all mt-3  font-bold text-indigo-500' href="/register">Registrate</Link>
      </div>

    </div>
  );
};

export default Login;
