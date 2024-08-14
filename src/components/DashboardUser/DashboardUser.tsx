"use client";
import AddAPhotoIcon from '@mui/icons-material/AddAPhoto';
import { useStore } from '@/app/lib/store/store';
import { Key, useEffect } from 'react';
import { priceStyle } from '@/app/lib/priceStyle/priceStyle';





const Profile = () => {
    const { user, orders, getOrders, products, fetchProducts } = useStore();
    useEffect(() => {
        getOrders();
        fetchProducts();
    }, [fetchProducts, getOrders]);


    const productNames = (id: string) => {
        const product = products.find((product) => product.id === id);
        if (product) {

            return product.title;
        } else {
            return "No se encontro el producto";
        }
    }

    console.log(orders);




    return (
        <section className='flex flex-col items-start pt-32 pb-32 gap-10 max-w-screen-lg h-full' style={{ margin: "0 auto" }}>
            <div className='flex gap-5 w-full'>
                <div className='bg-white border border-indigo-950/10 flex flex-col h-[300px] gap-3 p-16 rounded-xl shadow-md w-1/2 shadow-indigo-300'>
                    <h2 className='text-2xl  font-semibold text-indigo-500' >Mi perfil</h2>
                    <p className='text-xl'> Usuario: {user?.username}</p>
                    <p className='text-xl'> Mail: {user?.email}</p>

                </div>

                <div className="flex-col bg-white rounded-xl border-4 border-dashed border-slate-300 w-1/2 h-[300px] flex items-center justify-center">
                    <AddAPhotoIcon sx={{ fontSize: 100, color: "gray" }} />
                    Puedes añadir una foto de perfil si lo deseas.
                </div>
            </div>

            <div className='bg-white border border-indigo-950/10 flex flex-col justify-center items-start gap-3 p-16 rounded-xl w-full shadow-md shadow-indigo-300'>
                <h2 className='text-2xl font-semibold text-indigo-500'>Mis pedidos</h2>
                <ul className='flex flex-col gap-3 w-[100%]'>
                    {orders?.map((order) => (
                        <div
                            className='p-4 bg-indigo-100 border border-indigo-500/20 rounded-xl w-[100%] flex flex-col justify-start items-start'
                            key={order.id?.toString() || "unknown"} // Convertir id a string o usar "unknown"
                        >
                            <ul className='text-xl text-slate-600 font-semibold'>
                                <li>Orden: {order.id}</li>
                                <li>Usuario: {order.user?.username}</li>
                                <li>Total: <strong className='text-indigo-500 text-md font-semibold'>{priceStyle(order.totalAmount)}</strong></li>
                                <li className='flex gap-2'>
                                    {order.products && Array.isArray(order.products) && (
                                        <div>
                                            <span>{order.products.length > 1 ? "Productos:" : "Producto:"}</span>
                                            {order.products.map((product) => (
                                                <p key={product.productId?.toString() || "unknown"}>
                                                    {productNames(product.productId!.toString())}
                                                    <strong className='text-indigo-500 font-semibold text-md'>{" x" + product.quantity}</strong>.
                                                </p>
                                            ))}
                                        </div>
                                    )}
                                </li>
                            </ul>
                        </div>
                    ))}

                </ul>
            </div>
        </section>
    );
};

export default Profile;