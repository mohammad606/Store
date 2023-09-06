/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental:{
    appDir:true,
    serverActions:true
  },
  reactStrictMode: true,
}

module.exports = nextConfig

module.exports = {
  images:{
     domains :['https://www.4shared.com/account/home.jsp#dir=XbchcvqD']
  }
}
module.exports = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'assets.example.com',
        port: '',
        pathname: '/account123/**',
      },
    ],
  },
}
module.exports = function (api) {
  return {
    plugins: ['macros'],
  }
}
module.exports = {
  'fontawesome-svg-core': {
    'license': 'free'
  }
}