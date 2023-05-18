const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const CopyPlugin = require("copy-webpack-plugin");

module.exports = {
  entry: "./src/index.ts",
  devtool: "inline-source-map",
  mode: "development",
  watch: true,
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        use: "ts-loader",
        exclude: /node_modules/,
      },
    ],
  },
  resolve: {
    extensions: [".tsx", ".ts", ".js"],
  },
  output: {
    filename: "js/[name].[contenthash].js",
    path: path.resolve(__dirname, "../dist"),
    clean: true,
  },
  plugins: [
    new CopyPlugin({
      patterns: [{ from: path.resolve(__dirname, "../assets"), to: "" }],
    }),
    new HtmlWebpackPlugin({
      template: path.resolve(__dirname, "../public/index.html"),
    }),
  ],
};
