/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: false,
  swcMinify: true,
  images: {
    domains: [
      "https://nftsontm.infura-ipfs.io/ipfs",
      "nftsontm.infura-ipfs.io",
    ],
  },
  env: {
    // API_URL: "http://127.0.0.1:3001",
    API_URL: "https://node-nft-api.onrender.com",
    // infura
    PROJECT_ID: "2QXX7CVuy55vGeSCi2ntWSx39lg",
    PROJECT_SECRET_KEY: "9ab74124c25fdacc432843ec37076620",
    SUB_DOMAIN: "nftsontm.infura-ipfs.io",
    // sepolia url
    SEPOLIA_RPC_URL:
      "https://eth-sepolia.g.alchemy.com/v2/rDuqRyN9U6tPHDbd2_PMJ7KKa04Dtmbu",
  },
};

module.exports = nextConfig;
