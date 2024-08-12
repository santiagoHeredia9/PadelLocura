// src/components/Header.tsx

"use client";


import React from 'react';
import Link from 'next/link';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import HomeIcon from '@mui/icons-material/Home';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import { useStore } from '@/app/lib/store/store';
import { usePathname } from 'next/navigation';


const Header: React.FC = () => {
  const { appear, setAppear } = useStore();
  const pathname = usePathname();
  return (
    <header className={`bg-gray-800 text-white p-4 max-w-2xl rounded-full fixed ${pathname !== '/cart-detail' ? 'left-1/2 transform -translate-x-1/2' : 'left-64'} top-2 `}>
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
              <a className="hover:text-gray-400" onClick={() => setAppear(!appear)}><ShoppingCartIcon /></a>
            </li>
          }

          <li>
            <Link href="/register" legacyBehavior>
              <a className="hover:text-gray-400"><AccountCircleIcon /></a>
            </Link>
          </li>
        </ul>
      </nav>
    </header>
  );
};

export default Header;
