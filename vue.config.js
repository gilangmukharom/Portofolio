const { defineConfig } = require('@vue/cli-service')

module.exports = defineConfig({
  transpileDependencies: true,
  devServer: {
    proxy: {
      '/newsapi': {
        target: 'https://newsapi.org/v2',
        changeOrigin: true,
        pathRewrite: {
          '^/newsapi': ''
        },
        secure: false
      }
    }
  }
})
