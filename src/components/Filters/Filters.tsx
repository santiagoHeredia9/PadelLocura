"use client";

import { useState } from 'react';
import { useStore } from '@/app/lib/store/store';

const Filters = () => {
    const { filters, fetchProducts, resetPage } = useStore();
    const [selectedBrand, setSelectedBrand] = useState<string | null>(null);

    const handleFilter = (brand: string) => {
        setSelectedBrand(brand);
        filters(brand);
        resetPage();
    };

    const handleReset = async () => {
        setSelectedBrand(null); // Restablecer selección
        await fetchProducts();

        resetPage();

    };

    return (
        <div className="flex flex-row md:flex-col lg:flex-col gap-3 absolute top-32 lg:left-5">
            <button
                className={`p-4 w-20 h-20 rounded-xl flex justify-center items-center text-white cursor-pointer ${selectedBrand === null ? 'bg-gray-500' : 'bg-blue-700/70'}`}
                onClick={handleReset}
            >
                Todos
            </button>

            {["Adidas", "Bullpadel", "Kombat", "Royal", "Urich"].map((brand) => (
                <div
                    key={brand}
                    className={`text-white  w-20 h-20 rounded-xl flex justify-center items-center cursor-pointer ${selectedBrand === brand ? 'bg-gray-900/70' : 'bg-blue-700/70'}`}
                    onClick={() => handleFilter(brand)}
                >
                    {brand}
                </div>
            ))}
        </div>
    );
}

export default Filters;
