import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactStrictMode: false,
  images: {
    domains: ['cdn.gpb.ru'], // Разрешение загрузки изображений с этого домена
  }
};

export default nextConfig;
