"use client";

import React, { useEffect, useState } from 'react';
import { useStore } from '@/app/lib/store/store';
import Image from 'next/image';
import DeleteIcon from '@mui/icons-material/Delete';
import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove';
import Link from 'next/link';
import { priceStyle } from '@/app/lib/priceStyle/priceStyle';
import { toast } from 'react-toastify';
import "react-toastify/dist/ReactToastify.css";
import { useRouter } from 'next/navigation';

const CartDetail = () => {
    const { cartProducts, removeFromCart, changeQuantity, user, setOrder } = useStore();
    const [total, setTotal] = useState(0);
    const router = useRouter();

    useEffect(() => {
        setTotal(
            cartProducts.reduce((acc, product) => acc + product.price * product.quantity!, 0)
        );
    }, [cartProducts]);

    const handleBuy = async () => {
        if (user) {
            const products = cartProducts.map((product) => ({
                id: product.id,
                quantity: product.quantity || 1,
            }));

            const res = await setOrder(user.id, products, total);
            if (res.success) {
                removeFromCart("");
                setTotal(0);
                toast.success(`Se ha realizado la compra correctamente`, {
                    position: "top-right",
                    autoClose: 1500,
                });
                router.push("/dashboard-user");
            }
        }
    }

    return (
        <section className="flex flex-col lg:flex-row items-center mx-auto" style={{ margin: "0 auto" }}>
            <div className="w-full lg:w-1/3 lg:h-screen sm:h-1/3 flex items-center bg-gradient-to-t from-blue-600/30 via-indigo-500/20 to-slate-300/20">
                <Image src="https://res.cloudinary.com/dwsgd46gi/image/upload/v1723392244/lightMode_rodxns.png" alt="banner" width={700} height={700} />
            </div>
            <div className="w-full lg:w-2/3 h-screen shadow-2xl flex flex-col items-center justify-start">
                <ul className="flex flex-col gap-10 mt-20 w-[90%] lg:w-[50%] overflow-auto p-2">
                    {cartProducts && cartProducts.length > 0 ? cartProducts.map((product) => (
                        <li
                            key={product.id}
                            className="flex flex-col sm:flex-row items-center justify-between shadow-md rounded-xl w- bg-white p-8 gap-4">
                            <Image src={product.thumbnail} alt={product.title} width={120} height={120} className='sm:w-32' />
                            <div className="flex flex-col sm:flex-grow">
                                <p className='text-lg font-semibold'>{product.title} | {priceStyle(product.price)}</p>
                                <div className="flex justify-center sm:justify-start items-center gap-3 mt-2">
                                    <button
                                        className='flex items-center justify-center bg-indigo-600 w-7 h-7 text-white p-1 rounded-full'
                                        onClick={() => changeQuantity(product.id, 1)}
                                    >
                                        <AddIcon sx={{ fontSize: 20 }} />
                                    </button>
                                    <p className='text-lg text-slate-800 font-semibold'>{product.quantity}</p>
                                    <button
                                        className='flex items-center justify-center bg-indigo-600 w-7 h-7 text-white p-1 rounded-full'
                                        onClick={() => changeQuantity(product.id, -1)}
                                    >
                                        <RemoveIcon sx={{ fontSize: 20 }} />
                                    </button>
                                </div>
                            </div>
                            <button className='sm:ml-auto' onClick={() => removeFromCart(product.id)}>
                                <DeleteIcon className='hover:text-red-500' />
                            </button>
                        </li>
                    )) : (
                        <div className='flex flex-col justify-center items-center gap-4' >
                            <p className='text-2xl p-5 font-semibold bg-yellow-400/70 text-[#862B0D] rounded-lg' style={{ border: "1px solid  #862B0D" }}>Ya no hay productos en el carrito</p>
                            <Link className='hover:bg-blue-900 hover:text-white transition-all border border-blue-900 p-2 text-blue-900 text-xl font-semibold rounded-lg' href='/'>Volver al catálogo</Link>
                        </div>
                    )}
                </ul>
                <div className='pt-10 flex lg:absolute lg:bottom-6 flex-col justify-center items-center gap-4'>
                    <h3 className='text-3xl font-semibold'>Total: {priceStyle(total)}</h3>
                    <button disabled={cartProducts.length === 0} onClick={handleBuy} className={`flex items-center justify-center bg-indigo-600 ${cartProducts.length === 0 ? "cursor-not-allowed bg-slate-500" : ""} w-20 h-7 text-lg font-bold text-white p-5 rounded-lg`}>Pagar</button>
                </div>
            </div>
        </section>
    );
};

export default CartDetail;
