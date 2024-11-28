/** @type {import('next').NextConfig} */
const nextConfig = {
    async rewrites() {
      return [
        {
          source: '/api/graphql',
          destination: 'https://magento247.nipunasewa.site/graphql', 
        },
      ];
    },
  };
  
  export default nextConfig;
  