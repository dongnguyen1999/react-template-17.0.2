const { resolve } = require('path');
const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const TerserWebpackPlugin = require('terser-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');

const prod = process.env.NODE_ENV === 'production';

const loaders = {
  html: {
    loader: 'html-loader',
  },
  babel: {
    loader: 'babel-loader',
    options: {
      compact: false,
      cacheDirectory: !prod,
    },
  },
  style: [
    prod ? MiniCssExtractPlugin.loader : 'style-loader',
    'css-loader',
    'postcss-loader',
    'sass-loader',
  ],
  url: {
    loader: 'url-loader',
    options: {
      limit: 10000,
      publicPath: "/static/images/",
      outputPath: "static/images/",
    },
  },
  svg: {
    loader: '@svgr/webpack',
    options: {
      publicPath: "/static/images/",
      outputPath: "static/images/",
    }
  },
};

module.exports = {
  mode: prod ? 'production' : 'development',
  devtool: prod ? false : 'eval-source-map',
  entry: {
    app: resolve(__dirname, 'src/index'),
  },
  target: 'web',
  devServer: {
    historyApiFallback: true,
    // host: "0.0.0.0",
    port: 8000,
    hot: true,
    contentBase: path.join(__dirname, "/public"),
    publicPath: "/",
    sockPort: 8000,
    proxy: {
      "/api": {
        target: "https://dev.domain.vn",
        secure: false,
        changeOrigin: true,
      }
    },
  },
  resolve: {
    modules: ['node_modules'],
    mainFiles: ['index'],
    extensions: ['.js', '.mjs', '.jsx', '.json'],
  },
  module: {
    rules: [
      {
        test: /\.html$/,
        use: [loaders.html],
      },
      {
        test: /\.jsx?$/,
        exclude: /node_modules/,
        use: [loaders.babel],
      },
      {
        test: /\.(c|sc|sa)ss$/,
        use: loaders.style,
      },
      {
        test: /\.(jpe?g|png|gif|bmp)$/,
        use: [loaders.url],
      },
      {
        test: /\.svg$/,
        use: [loaders.svg, loaders.url]// 'file-loader?outputPath=images/&publicPath=/images/']
      },
    ],
  },
  plugins: [
    new HtmlWebpackPlugin({
      hash: false,
      template: 'public/index.html',
      favicon: 'public/favicon.ico',
      minify: {
        collapseWhitespace: true,
      },
    }),
    new CleanWebpackPlugin(),
    ...(prod
      ? [
        new MiniCssExtractPlugin({
          filename: 'static/css/[name].[contenthash:8].css',
          chunkFilename: 'static/css/[name].[contenthash:8].chunk.css',
        }),
      ]
      : []),
    {
      apply: (compiler) => {
        compiler.hooks.done.tap('DonePlugin', (stats) => {
          console.log('Compile is done !')
          setTimeout(() => {
            // process.exit(0)
          })
        });
      }
    }
  ],
  optimization: {
    minimize: prod,
    minimizer: [
      new TerserWebpackPlugin({
        parallel: true,
        terserOptions: {
          safari10: true,
        },
      }),
    ],
  },
  output: {
    path: resolve(__dirname, 'dist'),
    publicPath: "/",
    filename: 'static/js/[name].[contenthash:8].js',
    chunkFilename: 'static/js/[name].[id].[contenthash:8].chunk.js',
  },
};
