const path = require("path");
const env = require("yargs").argv.env; // use --env with webpack 2
const ClosurePlugin = require("closure-webpack-plugin");

const isProduction = env === "build";

let libraryName = "Drift";

let config;
{
  let outputFile, mode;

  if (env === "build") {
    mode = "production";
    outputFile = libraryName + ".min.js";
  } else {
    mode = "development";
    outputFile = libraryName + ".js";
  }
  config = buildWithEnv(mode, outputFile);
}

function buildWithEnv(mode, outputFile) {
  const config = {
    mode: mode,
    entry: __dirname + "/src/js/Drift-browser.js",
    devtool: "source-map",
    output: {
      path: __dirname + "/dist",
      filename: outputFile,
    },
    resolve: {
      modules: [path.resolve("./node_modules"), path.resolve("./src")],
      extensions: [".json", ".js"],
    },
    module: {
      rules: [],
    },
    plugins: [],
    optimization: {
      concatenateModules: false,
      minimize: isProduction,
      minimizer: [
        new ClosurePlugin(
          {
            mode: "AGGRESSIVE_BUNDLE",
            test: /^(?!.*tests\.webpack).*$/,
          },
          { languageIn: "ECMASCRIPT6", languageOut: "ECMASCRIPT5" }
        ),
      ],
    },
  };

  return config;
}

module.exports = config;
