const path = require('path')

module.exports = function (api) {
  api.cache(true)
  return {
    presets: ['babel-preset-expo'],
    plugins: [
      [
        'module-resolver',
        {
          extensions: ['.ts', '.tsx', '.js', '.jsx'],
          root: ['.'],
          alias: {
            components: path.resolve(__dirname, 'components'),
            assets: path.resolve(__dirname, 'assets'),
            constants: path.resolve(__dirname, 'constants'),
            hooks: path.resolve(__dirname, 'hooks'),
            models: path.resolve(__dirname, 'models'),
            navigation: path.resolve(__dirname, 'navigation'),
            screens: path.resolve(__dirname, 'screens'),
            store: path.resolve(__dirname, 'store'),
            data: path.resolve(__dirname, 'data'),
          },
        },
      ],
      "module:react-native-dotenv"
    ],
  }
}