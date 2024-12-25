/** @type {import('next').NextConfig} */
const nextConfig = {
  env: {
    OTP_SECRET_KEY: process.env.OTP_SECRET_KEY,
  },
};

module.exports = nextConfig;
