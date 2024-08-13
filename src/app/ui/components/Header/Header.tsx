// src/components/Header.tsx
"use client";

import React, { useEffect } from 'react';
import Link from 'next/link';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import HomeIcon from '@mui/icons-material/Home';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import LogoutIcon from '@mui/icons-material/Logout';
import { useStore } from '@/app/lib/store/store';
import { usePathname, useRouter } from 'next/navigation';
import { confirmAlert } from 'react-confirm-alert';
import 'react-confirm-alert/src/react-confirm-alert.css'; // Importa los estilos por defecto

const Header: React.FC = () => {
  const { appear, setAppear, user, setUser } = useStore();
  const pathname = usePathname();
  const router = useRouter();

  useEffect(() => {
    // Sincroniza el estado del usuario con localStorage al montar el componente
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
  }, [setUser]);

  const handleAccountClick = () => {
    if (user && Object.keys(user).length > 0) {
      // Si el usuario está logueado, redirige a la página de perfil
      router.push('/dashboard-user');
    } else {
      // Si el usuario no está logueado, redirige a la página de registro
      router.push('/register');
    }
  };

  const handleLogOut = () => {
    confirmAlert({
      customUI: ({ onClose }) => {
        return (
          <div className="bg-indigo-900/70 p-8 rounded-lg shadow-lg text-center">
             <h1 className="text-2xl text-white font-semibold mb-4">¿Estás seguro/a?</h1>
             <p className="mb-8 text-lg text-white">Se cerrará tu sesión.</p>
            <button
              onClick={() => {
                localStorage.removeItem('user');
                setUser(null); // Limpia el estado global de usuario
                router.push('/');
                onClose();
              }}
              className="bg-indigo-400 text-white py-2 px-4 rounded mr-4"
            >
              Sí
            </button>
            <button
              onClick={onClose}
              className="bg-gray-300 text-gray-700 py-2 px-4 rounded"
            >
              No
            </button>
          </div>
        );
      }
    });
  };

  return (
    <header className={`bg-gray-800 text-white p-4 max-w-2xl rounded-full fixed ${pathname !== '/cart-detail' ? 'left-1/2 transform -translate-x-1/2' : 'left-64'} top-2`}>
      <nav>
        <ul className="flex space-x-4">
          <li>
            <Link href="/" legacyBehavior>
              <a className="hover:text-gray-400"><HomeIcon /></a>
            </Link>
          </li>

          {
            pathname !== '/cart-detail' &&
            <li>
              <a className="hover:text-gray-400 cursor-pointer" onClick={() => setAppear(!appear)}><ShoppingCartIcon /></a>
            </li>
          }

          <li>
            <a onClick={handleAccountClick} className="hover:text-gray-400 cursor-pointer"><AccountCircleIcon /></a>
          </li>
          {user &&
            <li>
              <button onClick={handleLogOut}>
                <LogoutIcon className='hover:text-red-500 cursor-pointer' />
              </button>
            </li>
          }
        </ul>
      </nav>
    </header>
  );
};

export default Header;
