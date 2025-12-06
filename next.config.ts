import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactStrictMode: false,
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "cdn.gpb.ru",
        pathname: "/**",
      },
      {
        protocol: "https",
        hostname: "ru.js.cx",
        pathname: "/**",
      },
    ],
  },
};

export default nextConfig;
/**import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactStrictMode: false,
  images: {
    domains: ["cdn.gpb.ru", "ru.js.cx"], // Разрешение загрузки изображений с этого домена
  },
};

export default nextConfig; */
