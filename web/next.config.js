// @ts-check
/**
 * @type {import('next').NextConfig}
 **/
module.exports = {
    images: {
      remotePatterns: [
        {
          protocol: 'https',
          hostname: 'a.storyblok.com',
        },
      ],
    },
  }