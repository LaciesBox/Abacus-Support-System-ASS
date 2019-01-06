let path = require('path');

module.exports = {
  configureWebpack: {
    resolve: {
      alias: {
        "components": path.resolve(__dirname, 'src/components'),
        "utils": path.resolve(__dirname, 'src/utils'),
        "assets": path.resolve(__dirname, 'src/assets'),
        "screens": path.resolve(__dirname, 'src/screens'),
        "store": path.resolve(__dirname, 'src/store'),
        "styles": path.resolve(__dirname, 'src/store')
      }
    }
  },
  pluginOptions: {
    quasar: {
      theme: 'mat'
    }
  },
  transpileDependencies: [
    /[\\\/]node_modules[\\\/]quasar-framework[\\\/]/
  ]
}
