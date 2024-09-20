import path from 'path';

export default {
  pageExtensions: ['js', 'jsx'],
  webpack: (config) => {
    config.resolve.alias['@'] = path.resolve(process.cwd(), 'src');
    return config;
  },
};
