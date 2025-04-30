const nextConfig = {
  images: {
    domains: ["clinics.soulnbody.net"],
    unoptimized: true, // لتعطيل تحسين الصور الخارجية
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
