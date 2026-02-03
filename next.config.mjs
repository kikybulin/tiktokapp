/** @type {import('next').NextConfig} */
const nextConfig = {
  async rewrites() {
    return [
      { source: '/verify1', destination: '/verify1/tiktokXJPIWZEecfGbl6gkwHdHijnUsvC58Mrq.txt' },
      { source: '/verify1/', destination: '/verify1/tiktokXJPIWZEecfGbl6gkwHdHijnUsvC58Mrq.txt' },
      { source: '/verify2', destination: '/verify2/tiktokVPaKtfErufTWFfbHGYworLvhcU9hGKHz.txt' },
      { source: '/verify2/', destination: '/verify2/tiktokVPaKtfErufTWFfbHGYworLvhcU9hGKHz.txt' },
      { source: '/verify3', destination: '/verify3/tiktokmN4artWeTJIC14VzZqY9K1rR5iFTyIFU.txt' },
      { source: '/verify3/', destination: '/verify3/tiktokmN4artWeTJIC14VzZqY9K1rR5iFTyIFU.txt' },
    ];
  },
};

export default nextConfig;
