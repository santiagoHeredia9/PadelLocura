"use client";

import React, { useEffect } from 'react';
import { useStore } from '@/app/lib/store/store';
import Image from 'next/image';
import Link from 'next/link';
import Pagination from '@/app/ui/components/Pagination/Pagination';
import AddShoppingCartIcon from '@mui/icons-material/AddShoppingCart';
import { useRouter } from 'next/navigation';
import { priceStyle } from '@/app/lib/priceStyle/priceStyle';
import { confirmAlert } from 'react-confirm-alert';
import 'react-confirm-alert/src/react-confirm-alert.css'; // Importa los estilos por defecto


const Products = () => {
    const { products, fetchProducts, addToCart, currentPage, perPages, user } = useStore();
    const router = useRouter();

    useEffect(() => {
        fetchProducts();
    }, []);

    const indexOfLastPage = currentPage * perPages;
    const indexOfFirstPage = indexOfLastPage - perPages;
    const currentProducts = products.slice(indexOfFirstPage, indexOfLastPage);

    const handleAddToCart = (product) => {
        if (!user) {
            confirmAlert({
                customUI: ({ onClose }) => {
                    return (
                        <div className="bg-indigo-900/70 p-8 rounded-lg shadow-lg text-center">
                            <h1 className="text-2xl text-white font-semibold mb-4">¿Estás seguro?</h1>
                            <p className="mb-8 text-lg text-white">Debes registrarte para añadir productos al carro.</p>
                            <button
                                onClick={() => {
                                    router.push('/register');
                                    onClose();
                                }}
                                className="bg-indigo-400 text-white py-2 px-4 rounded mr-4"
                            >
                                Sí, quiero registrarme
                            </button>
                            <button
                                onClick={onClose}
                                className="bg-gray-300 text-gray-700 py-2 px-4 rounded"
                            >
                                Por el momento no
                            </button>
                        </div>
                    );
                }
            });
            return;
        }

        addToCart(product, 1);


    };

    return (
        <div className="flex pt-20 items-center gap-14 mt-10 flex-col">
            <ul className="grid grid-cols-4 gap-10">
                {currentProducts && currentProducts.map((product) => (
                    <li
                        className={`
                           flex 
                           flex-col
                           items-center
                           justify-center
                           bg-gradient-to-b
                         from-blue-600/30 from-10% via-indigo-500/20 via-20% to-white to-90%
                           backdrop-blur-0 
                           h-[300px] w-[300px] 
                           rounded-xl shadow-md 
                           transition-all 
                           hover:-translate-y-2 hover:bg-cyan-900/20 hover:shadow-xl
                        `}
                        key={product.id}
                    >
                        <Link href={`/detail/${product.id}`} key={product.id}>
                            <Image src={product.thumbnail} alt={product.title} width={200} height={200} />
                            <h2 className='text-center max-w-[200px] font-semibold text-xl'>{product.title} </h2>
                        </Link>
                        <div className="flex items-center justify-around w-full pt-4">
                            <p className='text-center text-xl font-semibold text-green-700/70 w-1/2'>{priceStyle(product.price)}</p>
                            <button
                                className='hover:text-white hover:bg-indigo-400 transition-all bg-indigo-900/20 rounded-xl p-1 w-1/4 z-30'
                                onClick={() => handleAddToCart(product)}
                            >
                                <AddShoppingCartIcon sx={{ fontSize: 20 }} />
                            </button>
                        </div>
                    </li>
                ))}
            </ul>
            <Pagination totalItems={products.length} />
        </div>
    );
};

export default Products;
