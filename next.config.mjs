/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: ["clinics.soulnbody.net"],
  },
  async rewrites() {
    return [
      {
        source: '/api/order',
        destination: 'https://clinics.soulnbody.net/pharmacy/public/api/order',
      },
    ];
  },
};

export default nextConfig;
