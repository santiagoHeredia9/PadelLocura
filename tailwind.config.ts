import type { Config } from 'tailwindcss';

const config: Config = {
  content: [
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',  // Actualiza para incluir 'src/app' y sus subcarpetas
    './src/ui/**/*.{js,ts,jsx,tsx,mdx}',   // Incluye la carpeta 'src/ui' para componentes
    './src/components/**/*.{js,ts,jsx,tsx,mdx}', // Incluye la carpeta 'src/components' para otros componentes
    './src/styles/**/*.{js,ts,jsx,tsx,mdx}', // Incluye la carpeta 'src/styles' si hay estilos específicos
    './public/**/*.{js,ts,jsx,tsx,mdx}',    // Incluye archivos en 'public' si hay componentes o archivos relevantes
  ],
  theme: {
    extend: {
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-conic': 'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
      },
    },
  },
  plugins: [],
};

export default config;
