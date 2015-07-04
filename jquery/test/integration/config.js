exports.config = {
  /**
   * language of your feature files
   * options: french, spanish, norwegian, polish, german, russian
   */
  language: 'english',

  /**
   * set selenium host and port
   */
  selenium: {
    host: '0.0.0.0',
    port: 4444
  },

  /**
   * webdriverio options
   *
   * - logLevel: stdout log level
   *   Options: *verbose* | *silent* | *command* | *data* | *result*
   *
   * - coloredLogs: Enables colors for log output
   *   default: true
   *
   * - singleton: Set to true if you always want to reuse the same remote
   *   default: false
   *
   * - waitforTimeout: Default timeout for all waitForXXX commands
   *   default: 500
   */
  options: {
    logLevel: 'silent',
  },

  /**
   * desired capabilities
   */
  capabilities: {
    browserName: 'chrome',
    loggingPrefs: {
      driver: 'INFO',
      browser: 'INFO'
    }
  },

  /**
   * location of feature files
   */
  featureFiles: [
    'test/integration/features/**/*.feature'
  ],

  /**
   * environment variables
   *
   * - baseUrl: sets base url for `Given I open the site "/some/url.html"`
   */
  env: {
    baseUrl: 'http://localhost:9999'
  },

  /**
   * mocha options
   * @see http://mochajs.org/
   */
  mochaOpts: {
    reporter: 'spec',
    timeout: 50000
  }
};
