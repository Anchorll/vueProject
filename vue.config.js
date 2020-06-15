module.exports = {
  configureWebpack: {
    devServer: {
      proxy: {
        '^/api': {
          target: 'http://127.0.0.1:3000',
          pathRewrite: {
            '^/api': ''
          }
        }
      }
    }
  }
}
