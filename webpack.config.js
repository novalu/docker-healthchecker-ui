const path = require('path');

const HardSourceWebpackPlugin = require("hard-source-webpack-plugin");
const CopyWebpackPlugin = require('copy-webpack-plugin');
const BabelMinifyPlugin = require("babel-minify-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");

const copyPlugin = new CopyWebpackPlugin([
  { from: "src/assets/images", to: "images" }
], {});
const hardSourcePlugin = new HardSourceWebpackPlugin();
const miniCssExtractPlugin = new MiniCssExtractPlugin({
  filename: "stylesheets/[name].css"
});

function getPlugins(argv) {
  const plugins = [
    miniCssExtractPlugin,
    copyPlugin,
  ];
  if (isDevelopment(argv)) plugins.push(hardSourcePlugin);
  return plugins;
}

function isDevelopment(argv) {
  return argv.mode !== "production";
}

function getOutputPath(argv) {
  return path.resolve(__dirname, "public");
}

module.exports = (env, argv) => ({

  devtool: isDevelopment(argv) ? "eval-cheap-module-source-map" : "cheap-source-map",

  entry: {
    dashboard: "./src/routes/dashboard/page/dashboard.script.ts",
  },

  output: {
    path: getOutputPath(argv),
    filename: "[name].js"
  },

  resolve: {
    extensions: [".ts", ".tsx", ".js"]
  },

  optimization: {
    minimize: false,
    minimizer: [
      new BabelMinifyPlugin()
    ]
  },

  module: {
    rules: [
      {
        test: /\.tsx?$/,
        loader: "ts-loader"
      },
      {
        test: /\.p?css$/,
        use: [
          {
            loader: MiniCssExtractPlugin.loader
          },
          {
            loader: "css-loader",
            options: {
              import: false,
              importLoaders: 2
            }
          },
          {
            loader: "resolve-url-loader"
          },
          {
            loader: "postcss-loader",
            options: {
              sourceMap: true,
              plugins: function(loader) {
                return [
                  require("postcss-import"),
                  require("postcss-url"),
                  require("postcss-inherit"),
                  require("postcss-nested"),
                  require("postcss-custom-properties"),
                  require("postcss-clean")
                ];
              }
            }
          }
        ]
      },
      {
        test: /\.(png|jpg|gif|svg)$/,
        loader: "file-loader",
        options: {
          limit: 10000,
          outputPath: "/images/",
          publicPath: "/images/"
        }
      },
      {
        test: /\.(eot|ttf|woff|woff2)$/,
        loader: "file-loader",
        options: {
          limit: 10000,
          outputPath: "/fonts/",
          publicPath: "/fonts/"
        }
      }
    ]
  },

  plugins: getPlugins(argv)

});
