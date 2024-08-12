/** @type {import('next').NextConfig} */
const nextConfig = {
    webpack(config) {
      // Excluye Sequelize y pg del bundle del cliente
      config.externals = {
        sequelize: 'commonjs sequelize',
        pg: 'commonjs pg',
      };
  
      // Añade fallbacks para módulos Node.js que no están disponibles en el cliente
      config.resolve.fallback = {
        fs: false,
        path: false,
        os: false,
        net: false,
      };
  
      return config;
    },
  
    images: {
      domains: ['res.cloudinary.com'], // Configura el dominio de Cloudinary
    },
  };
  
  export default nextConfig;
  