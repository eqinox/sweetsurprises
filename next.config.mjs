/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
        remotePatterns: [
            {
                protocol: 'http', // Use 'http' for 127.0.0.1
                hostname: '127.0.0.1',
                port: '1337', // You can specify a port if needed
                // pathname can be used to specify a path pattern, if needed
            },
            // Adding entry for sweetsurprises-f3cd9971ba40.herokuapp.com
            {
                protocol: 'https', // Use 'https' for secure requests
                hostname: 'sweetsurprises-f3cd9971ba40.herokuapp.com',
                // No need to specify port for standard https (443) requests
                // pathname can be used here as well, if needed
            },
            // ... other patterns
        ],
    },
    async redirects() {
        return [
            {
                source: '/',
                destination: '/home',
                permanent: true, // Set to false if the redirect should be temporary
            },
        ];
    }
};

export default nextConfig;
