// src/components/Products/Products.tsx
"use client";

import React, { useEffect } from 'react';
import { useStore } from '@/app/lib/store/store';
import Image from 'next/image';
import Link from 'next/link';
import Pagination from '@/app/ui/components/Pagination/Pagination';
import AddShoppingCartIcon from '@mui/icons-material/AddShoppingCart';
import { useRouter } from 'next/navigation'; // Importa useRouter para redireccionar

const Products = () => {
    const { products, fetchProducts, addToCart, currentPage, perPages, user } = useStore();
    const router = useRouter(); // Crea una instancia de useRouter

    useEffect(() => {
        fetchProducts();
    }, [fetchProducts]);

    const indexOfLastPage = currentPage * perPages;
    const indexOfFirstPage = indexOfLastPage - perPages;
    const currentProducts = products.slice(
        indexOfFirstPage,
        indexOfLastPage
    );

    const handleAddToCart = (product: any) => {
        if (!user) {
            if (window.confirm('Debes registrarte para añadir productos al carro, ¿Quieres hacerlo?')) {
                router.push('/register'); // Redirige al usuario a la página de registro
            }
            return;
        }
        if (product.stock !== undefined && product.stock > 0) {
            addToCart(product, 1);
        }
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
                         from-blue-600/30 from-10% via-indigo-500/20 via-20% to-slate-300/20 to-90%
                           backdrop-blur-0 
                           h-[300px] w-[300px] 
                           rounded-xl shadow-xl 
                           transition-all 
                           hover:-translate-y-2 hover:bg-cyan-900/20
                        `}
                        key={product.id}
                    >
                        <Link href={`/detail/${product.id}`} key={product.id}>
                            <Image src={product.thumbnail} alt={product.title} width={200} height={200} />
                            <h2 className='text-center max-w-[200px] font-semibold text-xl'>{product.title} </h2>
                        </Link>
                        <div className="flex items-center justify-around w-full pt-4">
                            <p className='text-center w-1/2'>${product.price}</p>
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
