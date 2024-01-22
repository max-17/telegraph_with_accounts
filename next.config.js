/** @type {import('next').NextConfig} */
const nextConfig = {     
   experimental: {
    serverActions:{
        allowedOrigins: ["localhost:3000", "st0xhjbl-3000.asse.devtunnels.ms", 'https://telegra.ph/upload'],
    }
    }
}

module.exports = nextConfig
