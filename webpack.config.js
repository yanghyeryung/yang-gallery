const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const CopyWebpackPlugin = require("copy-webpack-plugin");

const project_path = {
  src: path.join(__dirname, 'src'),
  dist: path.join(__dirname, 'dist'),
}

module.exports = (env, argv) => {
  console.log(argv.mode);
  return {
    mode: "development",
    entry: {
      bundle: ["./src/app/index.js", "./src/assets/sass/index.scss"],
    },
    output: {
      filename: "[name].[hash].js",
      path: project_path.dist,
    },
    resolve: {
      alias: {
        store: path.join(project_path.src, 'app/store'),
        views: path.join(project_path.src, 'app/views'),
      },
    },
    module: {
      rules: [
        {
          test: /\.js$/,
          exclude: /(node_modules)/,
          use: {
            loader: "babel-loader",
            options: {
              presets: ["@babel/preset-env", "@babel/preset-react"],
              plugins: ["@babel/plugin-transform-runtime"],
            },
          },
        },
        {
          test: /\.scss$/,
          use: [MiniCssExtractPlugin.loader, "css-loader", "sass-loader"],
        },
      ],
    },
    devServer: {
      contentBase: path.join(__dirname, "dist"),
      publicPath: "/",
      hot: true,
      compress: true,
    },
    plugins: [
      new CopyWebpackPlugin({
        patterns: [
          { from: "src/assets/fonts/noto", to: "fonts" },
          { from: "src/assets/images", to: "images" },

          { from: "manifest.json", to: "manifest.json" },
          { from: "next-steps.html", to: "next-steps.html" },
          { from: "offline.html", to: "offline.html" },
          { from: "pwabuilder-sw.js", to: "pwabuilder-sw.js" },
        ],
      }),
      new HtmlWebpackPlugin({
        template: "./index.html",
        templateParameters: {
          title: "Yang Gallery",
        },
      }),
      new MiniCssExtractPlugin({
        filename: "[name].[hash].css",
      }),
    ],
  };
};
