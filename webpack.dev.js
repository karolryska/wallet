const merge = require("webpack-merge");
const common = require("./webpack.common.js");

module.exports = merge(common, {
  devtool: "source-map",
  mode: "development",

  module: {
    rules: [
      {
        test: /\.s[ac]ss$/i,
        loader: [
          "style-loader",
          {
            loader: "css-loader",
            options: {
              sourceMap: true,
            },
          },
          {
            loader: "sass-loader",
            options: {
              sourceMap: true,
            },
          },
        ],
      },
      {
        test: /\.css$/i,
        loader: [
          "style-loader",
          {
            loader: "css-loader",
            options: {
              sourceMap: true,
            },
          },
        ],
      },
    ],
  },

  optimization: {
    runtimeChunk: 'single',
  },

  devServer: {
    port: 8080,
    host: '0.0.0.0'
  },
});
