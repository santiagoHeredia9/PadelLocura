// app/layout.tsx
import '@/app/global.css';
import { ReactNode } from 'react';
import Header from '../components/Header/Header';
import Cart from '@/components/Cart/Cart';
import { ToastContainer } from "react-toastify"

interface LayoutProps {
    children: ReactNode;
}

export default function RootLayout({ children }: LayoutProps) {

    return (
        <html lang="en">
            <head>
                <title>My App</title>
                <meta name="viewport" content="width=device-width, initial-scale=1" />
            </head>
            <body className={`bg-slate-200/50`}>
                <ToastContainer />
                <Header />
                <Cart />
                {children}
            </body>
        </html>
    );
}
