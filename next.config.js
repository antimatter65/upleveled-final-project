/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  compiler: {
    emotion: true,
  },
};

module.exports = nextConfig;

// module.exports = {
//   images: {
//     loader: 'cloudinary',
//     path: 'https://res.cloudinary.com/dfmmykkmb/image/upload/',
//   },
// };
