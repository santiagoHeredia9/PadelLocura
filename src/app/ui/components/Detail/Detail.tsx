// app/components/Detail/Detail.tsx
"use client";

import React, { useEffect } from 'react';
import { useParams } from 'next/navigation'; // Importa useParams de next/navigation
import { useStore } from '../../../lib/store/store';

const Detail = () => {
  const params = useParams();
  const id = params?.id;
  const { productDetail, detail } = useStore();

  useEffect(() => {
    if (id) {
      detail(id as string); // Llama a la función detail con el id
    }
  }, [id, detail]);

  if (!productDetail) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <h2>{productDetail.product_name}</h2>
      <p>Price: ${productDetail.product_price}</p>
      <p>Brand: {productDetail.product_brand}</p>
      {/* Añade más detalles según sea necesario */}
    </div>
  );
};

export default Detail;
