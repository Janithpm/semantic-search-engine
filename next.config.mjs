/** @type {import('next').NextConfig} */
const nextConfig = {
    webpack: (config) => {
        config.externals.push({
            'onnxruntime-node': 'onnxruntime-node'
        });
        return config;
    },
    serverComponentsExternalPackages: ['onnxruntime-node']
};

export default nextConfig;
