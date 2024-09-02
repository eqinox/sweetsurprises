/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
        remotePatterns: [
            {
                protocol: 'http',
                hostname: '127.0.0.1',
                port: '1337',
                // pathname can be used to specify a path pattern, if needed
            },
            {
                protocol: 'https',
                hostname: 'sweetsurprises-f3cd9971ba40.herokuapp.com',
                // No need to specify port for standard https (443) requests
                // pathname can be used here as well, if needed
            },
            // Add your S3 bucket here
            {
                protocol: 'https',
                hostname: 'sweetsurprises-bucket.s3.eu-north-1.amazonaws.com',
                // No port needed for standard https requests
                // You can add pathname if you want to limit to specific paths
            },
            // ... other patterns
        ],
    }
};

export default nextConfig;
