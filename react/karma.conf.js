// Based on: https://raw.githubusercontent.com/cesarandreu/web-app/master/karma.conf.js

var webpackConfig = require('./webpack.karma.config');

module.exports = function karmaConfig(config) {
  config.set({
    frameworks: [
      'sinon-chai',
      'sinon',
      'chai-as-promised',
      'chai',
      'mocha'
    ],

    reporters: [
      'mocha'
    ],

    files: [
      'test/_lib/browser-tests.index.js'
    ],

    preprocessors: {
      'test/_lib/browser-tests.index.js': ['webpack', 'sourcemap']
    },

    browsers: [
      'Chrome'
    ],

    singleRun: true,

    webpack: webpackConfig,

    webpackMiddleware: {
      stats: {
        colors: true,
        assets: false,
        chunks: false,
        modules: false,
        hash: false
      }
    },

    colors: true,
    captureTimeout: 60000,
    browserNoActivityTimeout: 45000,

    customLaunchers: {
      PhantomJS_debug: {
        base: 'PhantomJS',
        debug: true
      }
    },

    phantomjsLauncher: {
      exitOnResourceError: true
    },

    client: {
      captureConsole: true,
      chai: {
        includeStack: true,
        showDiff: true,
        truncateThreshold: 0
      },
      mocha: {
        reporter: 'html',
        bail: true,
        ui: 'bdd'
      }
    }
  });
}
