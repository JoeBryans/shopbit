/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
        remotePatterns: [
            {
                protocol: 'https',
                hostname: 'res.cloudinary.com',

            },
            {
                protocol: 'https',
                hostname: 'avatar.iran.liara.run',

            },


        ]
    },
    experimental: {
        serverComponentsHmrCache: false
    }
};

export default nextConfig;
