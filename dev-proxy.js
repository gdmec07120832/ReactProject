module.exports = {
        '/bi-dm': {
        target: 'http://10.10.14.123:8000',
        changeOrigin: true,
        ws: false,
        pathRewrite: {
          '^/bi-dm': '',
        },
        secure: false,
      }
   }