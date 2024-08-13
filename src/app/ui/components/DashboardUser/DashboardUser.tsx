"use client";
import AddAPhotoIcon from '@mui/icons-material/AddAPhoto';
import { useStore } from '@/app/lib/store/store';
import { useEffect } from 'react';
import { priceStyle } from '@/app/lib/priceStyle/priceStyle';





const Profile = () => {
    const { user, orders, getOrders } = useStore();
    useEffect(() => {
        getOrders();
    }, []);

    console.log(orders);
    return (
        <section className='flex flex-col items-start pt-48  gap-10 max-w-screen-lg  h-screen' style={{ margin: "0 auto" }}>
            <div className='flex gap-5 w-full'>
                <div className='bg-indigo-50/20 border border-indigo-950/10 flex flex-col h-[300px] gap-3 p-16 rounded-xl shadow-md w-1/2 shadow-indigo-300'>
                    <h2 className='text-2xl' >Mi perfil</h2>
                    <p className='text-xl'> Usuario: {user?.username}</p>
                    <p className='text-xl'> Mail: {user?.email}</p>

                </div>

                <div className="flex-col bg-slate-100 rounded-xl border-4 border-dashed w-1/2 h-[300px] flex items-center justify-center">
                    <AddAPhotoIcon sx={{ fontSize: 100, color: "gray" }} />
                    Puedes añadir una foto de perfil si lo deseas.
                </div>
            </div>

            <div className='bg-indigo-50/20 border border-indigo-950/10 flex flex-col gap-3 p-16 rounded-xl w-full shadow-md shadow-indigo-300'>
                <h2 className='text-2xl'>Mis pedidos</h2>
                <ul>
                    {orders?.map((order) => (
                        <div key={order.id} >
                            <li className='text-xl'>Orden: {order.id}</li>
                            <li className='text-xl'>Usuario: {order.userId}</li>
                            <li className='text-xl flex gap-2 '>{order.products && order.products.length > 1 ? "Productos:" : "Producto:"} {order.products && order.products.map((product) => <p>{product.productId},</p>)}</li>
                            <li className='text-xl'>Total: {priceStyle(order.totalAmount)}</li>
                        </div>
                    ))}
                </ul>
            </div>
        </section>
    );
};

export default Profile;