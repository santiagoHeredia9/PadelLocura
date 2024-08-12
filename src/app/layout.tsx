// app/layout.tsx
import '@/app/global.css';
import { ReactNode } from 'react';
import Header from './ui/components/Header/Header';

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
            <body>
                <Header />
                {children}
            </body>
        </html>
    );
}
