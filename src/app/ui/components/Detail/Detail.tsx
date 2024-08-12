// app/components/Detail/Detail.tsx
"use client";

import React, { useEffect } from 'react';
import { useParams } from 'next/navigation'; // Importa useParams de next/navigation
import { useStore } from '@/app/lib/store/store';
import Image from 'next/image';
import StarIcon from '@mui/icons-material/Star';
import StarHalfIcon from '@mui/icons-material/StarHalf';
import AddShoppingCartIcon from '@mui/icons-material/AddShoppingCart';

const Detail = () => {
  const params = useParams();
  const id = params?.id;
  const { productDetail, detail, addToCart } = useStore();


  const ratingStars = (rate: number) => {
    const stars = [];
    const fullStars = Math.floor(rate);
    const hasHalfStar = rate % 1 >= 0.5;

    // Añadir estrellas completas
    for (let i = 1; i <= fullStars; i++) {
      stars.push(<StarIcon key={i} />);
    }

    // Añadir media estrella si es necesario
    if (hasHalfStar) {
      stars.push(<StarHalfIcon key={fullStars + 1} />);
    }

    return stars;
  };

  const ratingTypeFade = (rate: number) => {
    if (rate <= 3) {
      return "bg-gradient-to-b from-slate-600/30 from-10% via-slate-500/20 via-20% to-slate-300/20 to-90%"
    } else if (rate > 3 && rate < 5) {
      return "bg-gradient-to-b from-green-600/30 from-10% via-green-500/20 via-20% to-green-50/20 to-90%"
    } else if (rate === 5) {
      return "bg-gradient-to-b from-yellow-500/40 from-10% via-yellow-500/20 via-20% to-yellow-50/20 to-90%"
    }
  }


  const ratingTypeColor = (rate: number) => {
    if (rate <= 3) {
      return "text-slate-600"
    } else if (rate > 3 && rate < 5) {
      return "text-green-600"
    } else if (rate === 5) {
      return "text-yellow-600"
    }
  }

  useEffect(() => {
    if (id) {
      detail(id as string); // Llama a la función detail con el id
    }
  }, [id, detail]);

  if (!productDetail) {
    return <div>Loading...</div>;
  }


  return (
    <div className="flex items-center justify-center gap-11 h-screen max-w-7xl" style={{ margin: "0 auto" }}>
      <div className={` w-2/5
        relative flex flex-col items-center justify-center gap-6 
        border p-10 shadow-xl
        ${ratingTypeFade(productDetail.rating)}
         backdrop-blur-0 rounded-xl
        `} >
        <Image src={productDetail.thumbnail} alt="Product" width={500} height={500} />
        <Image className='animate-bounce absolute right-0 top-0' src={"https://res.cloudinary.com/dwsgd46gi/image/upload/v1723461463/ball_hatzcf.png"} alt="Product" width={50} height={50} />

        <p className={`text-lg p-1 rounded-lg flex items-center justify-center ${ratingTypeColor(productDetail.rating)}`}>{ratingStars(productDetail.rating)}</p>
      </div>
      <div className="w-3/5 flex flex-col gap-10 justify-start h-[530px]">
        <h4 className='text-3xl font-semibold'>Especificaciones</h4>
        <div className='p-4 shadow-md border-x-8 border-x-indigo-400  text-lg rounded-xl'>
          <p> <strong className='text-indigo-900 font-semibold'>Modelo: </strong>{productDetail.title}</p>
          <p> <strong className='text-indigo-900 font-semibold'>Marca: </strong>{productDetail.brand}</p>
          <p> <strong className='text-indigo-900 font-semibold'>Precio: </strong>${productDetail.price}</p>
          <p> <strong className='text-indigo-900 font-semibold'>Material: </strong>{productDetail.material}</p>
          <p> <strong className='text-indigo-900 font-semibold'>Forma: </strong>{productDetail.form}</p>
          <p> <strong className='text-indigo-900 font-semibold'>Núcleo: </strong>{productDetail.nucleo}</p>
          <p> <strong className='text-indigo-900 font-semibold'>Grosor: </strong>{productDetail.thickness}mm</p>

        </div>
        <div className='p-4 shadow-md border-x-8 border-x-indigo-400 rounded-xl'>
          <h5 className='text-xl font-semibold text-indigo-900'>Descripción: </h5>
          <p className='text-lg'>{productDetail.description}</p>
        </div>

        <button className='hover:text-white hover:bg-indigo-400 transition-all bg-indigo-900/20 rounded-xl text-lg p-1 w-1/4 z-30' onClick={() => productDetail.stock !== undefined && productDetail.stock > 0 && addToCart(productDetail, 1)}>Agregar al carrito <AddShoppingCartIcon sx={{ fontSize: 20 }} /></button>
      </div>
      {/* Añade más detalles según sea necesario */}
    </div>
  );
};

export default Detail;
