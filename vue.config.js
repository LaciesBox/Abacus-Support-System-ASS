let path = require('path');

module.exports = {
  configureWebpack: {
    resolve: {
      alias: {
        "components": path.resolve(__dirname, 'src/components'),
        "pages": path.resolve(__dirname, 'src/components/pages'),
        "mixins": path.resolve(__dirname, 'src/components/mixins'),
        "modals": path.resolve(__dirname, 'src/modals'),
        "utils": path.resolve(__dirname, 'src/utils'),
        "assets": path.resolve(__dirname, 'src/assets'),
        "screens": path.resolve(__dirname, 'src/screens'),
        "store": path.resolve(__dirname, 'src/store'),
        "styles": path.resolve(__dirname, 'src/styles'),
        "@": path.resolve(__dirname, 'src')
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
