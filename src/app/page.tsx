import React from 'react';
import Products from '@/app/ui/components/Products/Products';
import Cart from '@/app/ui/components/Cart/Cart';


const HomePage = () => {

    return (
        <>
            <Cart />
            <Products />
        </>
    );
};

export default HomePage;