const webpackConfig = require("../../webpack.config");

const webpackConfigAugmented = {
  ...webpackConfig,
  module: {
    ...webpackConfig.module,
    rules: [
      {
        test: /(\.jsx|\.js)$/,
        loader: "babel-loader",
        exclude: /(node_modules|bower_components)/
      }
    ]
  }
};

const baseConfig = {
  frameworks: ["jasmine"],
  files: ["../../tests.webpack.js"],
  preprocessors: {
    "../../tests.webpack.js": "webpack"
  },
  webpack: webpackConfigAugmented,
  webpackMiddleware: {
    stats: "errors-only"
  },
  concurrency: 5,
  captureTimeout: 90000,
  browserConnectTimeout: 3000,
  browserNoActivityTimeout: 15000
};

const stringConfig = JSON.stringify(baseConfig);

/**
 * Local testing - Chrome and FF, headlessly
 */

const localConfig = karmaConfig => {
  const config = {
    ...baseConfig,
    browsers: ["ChromeHeadless", "FirefoxHeadless"],
    customLaunchers: {
      FirefoxHeadless: {
        base: "Firefox",
        flags: ["-headless"]
      }
    }
  };

  karmaConfig.set(config);
};

/**
 * CI testing - Chrome, Firefox
 */

const ciConfig = karmaConfig => {
  const config = {
    ...baseConfig,
    browsers: ["ChromeTravis", "FirefoxHeadless"],
    customLaunchers: {
      ChromeTravis: {
        base: "ChromeHeadless",
        flags: ["--no-sandbox"]
      },
      FirefoxHeadless: {
        base: "Firefox",
        flags: ["-headless"]
      }
    },
    client: {
      mocha: {
        timeout: 20000 // 20 seconds
      }
    }
  };

  karmaConfig.set(config);
};

/**
 * SauceLabs configuration - not supported
 */

var fullConfig = JSON.parse(stringConfig);
fullConfig.reporters = ["progress", "saucelabs"];
fullConfig.saucelabs = { testName: "Drift Tests" };
fullConfig.browsers = [
  "sl_chrome",
  "sl_safari_9",
  "sl_safari_8",
  "sl_firefox_42",
  "sl_firefox_41",
  "sl_ie_11",
  "sl_ie_10",
  "sl_ios_9",
  "sl_ios_8",
  "sl_android_5",
  "sl_android_4"
];
fullConfig.customLaunchers = {
  sl_chrome: { base: "SauceLabs", browserName: "Chrome" },
  sl_safari_9: { base: "SauceLabs", browserName: "Safari", version: 9 },
  sl_safari_8: { base: "SauceLabs", browserName: "Safari", version: 8 },
  sl_firefox_42: { base: "SauceLabs", browserName: "Firefox", version: 42 },
  sl_firefox_41: { base: "SauceLabs", browserName: "Firefox", version: 41 },
  sl_ie_11: {
    base: "SauceLabs",
    browserName: "Internet Explorer",
    version: "11"
  },
  sl_ie_10: {
    base: "SauceLabs",
    browserName: "Internet Explorer",
    version: "10"
  },
  sl_ios_9: { base: "SauceLabs", browserName: "iPhone", version: "9.2" },
  sl_ios_8: { base: "SauceLabs", browserName: "iPhone", version: "8.4" },
  sl_android_5: { base: "SauceLabs", browserName: "Android", version: "5.1" },
  sl_android_4: { base: "SauceLabs", browserName: "Android", version: "4.4" }
};

exports.local = localConfig;
exports.ci = ciConfig;
exports.full = karmaConfig => karmaConfig.set(fullConfig);
