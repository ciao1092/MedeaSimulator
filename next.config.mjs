/** @type {import('next').NextConfig} */
const nextConfig = {
    reactStrictMode: true,
    distDir: "docs",
    // to export static
    output: "export",
    images: {
      unoptimized: true,
    }
};

export default nextConfig;
