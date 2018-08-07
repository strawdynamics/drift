const webpack = require("webpack");
const path = require("path");
const env = require("yargs").argv.env; // use --env with webpack 2
const ClosureCompilerPlugin = require("webpack-closure-compiler");

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
      filename: outputFile
    },
    resolve: {
      modules: [path.resolve("./node_modules"), path.resolve("./src")],
      extensions: [".json", ".js"]
    },
    module: {
      rules: []
    },
    plugins: [
      new ClosureCompilerPlugin({
        compiler: {
          language_in: "ECMASCRIPT6",
          language_out: "ECMASCRIPT5",
          compilation_level: "ADVANCED",
          create_source_map: true
        },
        test: /^(?!.*tests\.webpack).*$/,
        concurrency: 3
      })
    ]
  };

  return config;
}

module.exports = config;
