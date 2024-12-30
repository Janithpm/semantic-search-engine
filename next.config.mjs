/** @type {import('next').NextConfig} */
const nextConfig = {
    serverExternalPackages: ['onnxruntime-node'],
    webpack: (config) => {
        config.externals.push({
            'onnxruntime-node': 'onnxruntime-node'
        });
        return config;
    }
};

export default nextConfig;
