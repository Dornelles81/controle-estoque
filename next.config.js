/** @type {import('next').NextConfig} */
const nextConfig = {
  // Remover 'experimental.appDir' - não é mais necessário no Next.js 14
  images: {
    domains: ['localhost'],
  },
  // Outras configurações podem ser adicionadas aqui
}

module.exports = nextConfig