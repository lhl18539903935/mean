// see http://vuejs-templates.github.io/webpack for documentation.
var path = require('path')

module.exports = {
  build: {
    env: require('./prod.env'),
    index: path.resolve(__dirname, '../dist/index.html'),
    assetsRoot: path.resolve(__dirname, '../dist'),
    assetsSubDirectory: 'static',
    assetsPublicPath: './',
    productionSourceMap: false,
    // Gzip off by default as many popular static hosts such as
    // Surge or Netlify already gzip all static assets for you.
    // Before setting to `true`, make sure to:
    // npm install --save-dev compression-webpack-plugin
    productionGzip: false,
    productionGzipExtensions: ['js', 'css'],
    // Run the build command with an extra argument to
    // View the bundle analyzer report after build finishes:
    // `npm run build --report`
    // Set to `true` or `false` to always turn it on or off
    bundleAnalyzerReport: process.env.npm_config_report
  },
  dev: {
    env: require('./dev.env'),
    port: 8080,
    autoOpenBrowser: false,
    assetsSubDirectory: 'static',
    assetsPublicPath: '/',
    proxyTable: {
        '/home/toLogin':{
            target:'http://r.huileyi.com/home/toLogin',
            changeOrigin:true
        },
        '/home/getUserMessage':{
            target:'http://r.huileyi.com/home/getUserMessage',
            changeOrigin:true
        },
        '/home/getSlideShow':{
            target:'http://r.huileyi.com/home/getSlideShow',
            changeOrigin:true
        },
        '/Dls/lowerDlsList':{
            target:'http://p.huileyi.com/Dls/lowerDlsList',
            changeOrigin:true
        },
        '/Dls/lowerDlsDetail':{
            target:'http://p.huileyi.com/Dls/lowerDlsDetail',
            changeOrigin:true
        },
        '/Dls/uploadImg':{
            target:'http://p.huileyi.com/Dls/uploadImg',
            changeOrigin:true
        },
        '/home/getCode':{
            target:'http://r.huileyi.com/home/getCode',
            changeOrigin:true
        },
        '/Dls/addLowerDls':{
            target:'http://p.huileyi.com/Dls/addLowerDls',
            changeOrigin:true
        },
        '/home/getClause':{
            target:'http://r.huileyi.com/home/getClause',
            changeOrigin:true
        },
      'store/getMyStore':{
        target:'http://r.huileyi.com/store/getMyStore',
        changeOrigin:true
      },
        '/home/checkRegMessage':{
          target:'http://r.huileyi.com/home/checkRegMessage',
          changeOrigin:true
        },
        '/home/uploadDlsProfile':{
            target:'http://r.huileyi.com/home/uploadDlsProfile',
            changeOrigin:true
        },
        '/home/uploadPersonDatum':{
        target:'http://r.huileyi.com/home/uploadPersonDatum',
        changeOrigin:true
      },

      '/home/getUserDetail':{
        target:'http://r.huileyi.com/home/getUserDetail',
        changeOrigin:true
      },
      '/home/getAffiche':{
        target:'http://r.huileyi.com/home/getAffiche',
        changeOrigin:true
      },
      '/Dls/qrcodeList':{
        target:'http://p.huileyi.com/Dls/qrcodeList',
        changeOrigin:true
      },
      '/Dls/allocateQrcode':{
        target:'http://p.huileyi.com/Dls/allocateQrcode',
        changeOrigin:true
      },
      '/Dls/qrcodeDetail':{
        target:'http://p.huileyi.com/Dls/qrcodeDetail',
        changeOrigin:true
      }


    },
    // CSS Sourcemaps off by default because relative paths are "buggy"
    // with this option, according to the CSS-Loader README
    // (https://github.com/webpack/css-loader#sourcemaps)
    // In our experience, they generally work as expected,
    // just be aware of this issue when enabling this option.
    cssSourceMap: false
  }
}
