"use client";

import React from 'react';
import { useStore } from '@/app/lib/store/store';
import Link from 'next/link';
import Image from 'next/image';
import DeleteIcon from '@mui/icons-material/Delete';

const Cart = () => {
  const { cartProducts, removeFromCart, appear, setAppear } = useStore();

  return (
    <>
      {/* Overlay */}
      {appear && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-40"
          onClick={() => setAppear(false)}
        ></div>
      )}

      {/* Sidebar */}
      <div
        className={
          appear
            ? "translate-x-0 transition-all duration-300 z-50"
            : "translate-x-full transition-all duration-300 z-50"
        }
        style={{ position: "fixed", right: 0, top: 10, height: "100%", width: "350px", borderTopLeftRadius: "10px", backgroundColor: "#FFF5E1" }}
      >
        <ul className="flex items-center justify-start mt-20 gap-10  flex-col h-full">
          <h2 className="text-xl text-[#FFF5E1] p-2 font-bold bg-blue-950 w-full text-left fixed top-0" style={{ borderTopLeftRadius: "10px" }}>Mi carrito</h2>
          {cartProducts.length > 0 && cartProducts ? cartProducts.map((product) => (
            <li key={product.id} className='flex items-center justify-around w-full'>
              <Image className='bg-white rounded-full shadow-xl absolute left-5' src={product.thumbnail} alt={product.name} width={50} height={50} />
              <p className='absolute left-16 bg-blue-900 text-[#FFF5E1] h-6 w-6 text-center rounded-full'>{product.quantity}</p>
              <p className='font-bold text-center'>{product.title}</p>
              <button className='absolute right-10' onClick={() => removeFromCart(product.id)}><DeleteIcon className='hover:text-red-500' /></button>
            </li>
          )) : (<p className=' font-semibold bg-yellow-400/70 p-2 text-[#862B0D] rounded-lg' style={{ border: "1px solid  #862B0D" }}>No hay productos aun...</p>)}
          <Link href="/cart-detail " >
            <button className={`${cartProducts.length === 0 ? "hidden" : ""} left-1/2 transform -translate-x-1/2 text-center text-xl font-bold rounded-lg shadow-md fixed bottom-10 bg-blue-900 hover:bg-violet-500 transition-all p-2 w-[70%] text-[#FFF5E1]`}>
              Ver detalles
            </button>
          </Link>
        </ul>

      </div>
    </>
  );
};

export default Cart;
