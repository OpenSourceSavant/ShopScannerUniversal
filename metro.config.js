const { getDefaultConfig } = require('@expo/metro-config');

const defaultConfig = getDefaultConfig(__dirname);
defaultConfig.resolver.sourceExts.push('cjs');

module.exports = {
    ...defaultConfig,
    web: {
      corsHeaders: {
        '192.168.1.10': 'allow', // replace '192.168.1.13' with your computer's IP address
      },
    },
  };
  