module.exports = {
  css: {
    loaderOptions: {
      less: {
        lessOptions: {
          javascriptEnabled: true,
        }
      }
    }
  },
  devServer: {
    proxy: {
      '/api': {
        target: 'http://122.51.139.75:7001',
        ws: true,
        changeOrigin: true,
      },
    }
  },
  publicPath: './',
};