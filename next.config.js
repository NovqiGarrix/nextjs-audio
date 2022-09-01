/** @type {import('next').NextConfig} */
module.exports = {
  reactStrictMode: true,
  env: {
    REDIS_CONNECTION_STRING: process.env.REDIS_CONNECTION_STRING,
  },
};
