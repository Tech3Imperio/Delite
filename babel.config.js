module.exports = {
  presets: ['module:@react-native/babel-preset'],
  plugins: [
    [
      'module-resolver',
      {
        alias: {
          '@tamagui/helpers-icon': './node_modules/@tamagui/helpers-icon/src',
        },
      },
    ],
    [
      '@tamagui/babel-plugin',
      {
        components: ['tamagui', '@tamagui/lucide-icons'],
        config: 'src/tamagui.config.ts',
        importsWhitelist: ['constants.js', 'colors.js'],
        logTimings: true,
        disableExtraction: process.env.NODE_ENV === 'development',
      }
    ],
    ['module:react-native-dotenv', {
      moduleName: '@env',
      path: '.env',
      blacklist: null,
      whitelist: null,
      safe: true,
      allowUndefined: false,
    }],
  ],
};
