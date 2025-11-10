module.exports = function(config) {
  config.set({
    // base path that will be used to resolve all patterns (eg. files, exclude)
    basePath: '',

    // frameworks to use
    // available frameworks: https://npmjs.org/browse/keyword/karma-adapter
    frameworks: ['jasmine'],

    // list of files / patterns to load in the browser
    files: [
      'src/setupTests.spec.ts',
      'src/**/*.spec.ts',
      'src/**/*.spec.tsx'
    ],

    // list of files to exclude
    exclude: [
      'node_modules',
      'node_modules/@testing-library/**',
      'node_modules/react/**',
      'node_modules/react-dom/**',
      'node_modules/@types/**',
      'node_modules/@testing-library/react/dist/index.js'
    ],

    // preprocess matching files before serving them to the browser
    // available preprocessors: https://npmjs.org/browse/keyword/karma-preprocessor
    preprocessors: {},

    // karma-typescript configuration
    karmaTypescriptConfig: {
      tsconfig: './tsconfig.spec.json',
      compilerOptions: {
        module: 'commonjs',
        skipLibCheck: true,
        target: 'ES5'
      },
      bundlerOptions: {
        transforms: [
          require('karma-typescript-es6-transform')()
        ],
        exclude: [
          'node_modules/@testing-library/**',
          'node_modules/react/**',
          'node_modules/react-dom/**',
          'node_modules/@types/**',
          'node_modules/@testing-library/react/dist/index.js'
        ]
      }
    },

    // test results reporter to use
    // possible values: 'dots', 'progress'
    // available reporters: https://npmjs.org/browse/keyword/karma-reporter
    reporters: ['progress'],

    // web server port
    port: 9876,

    // enable / disable colors in the output (reporters and logs)
    colors: true,

    // level of logging
    // possible values: config.LOG_DISABLE || config.LOG_ERROR || config.LOG_WARN || config.LOG_INFO || config.LOG_DEBUG
    logLevel: config.LOG_INFO,

    // enable / disable watching file and executing tests whenever any file changes
    autoWatch: true,

    // start these browsers
    // available browser launchers: https://npmjs.org/browse/keyword/karma-launcher
    browsers: ['ChromeHeadless'],

    // Continuous Integration mode
    // if true, Karma captures browsers, runs the tests and exits
    singleRun: false,

    // Concurrency level
    // how many browser should be started simultaneous
    concurrency: Infinity,

    // Timeout for capturing a browser (in ms)
    captureTimeout: 60000,

    // Timeout for a single test (in ms)
    browserNoActivityTimeout: 30000
  });
};
