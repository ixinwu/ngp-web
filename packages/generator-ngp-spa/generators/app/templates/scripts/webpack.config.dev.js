const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
// const { BundleAnalyzerPlugin } = require('webpack-bundle-analyzer');

const srcPath = path.join(__dirname, '../src/');
const distPath = path.join(__dirname, '../dist/');

const config = {
  mode: 'development',
  devtool: 'eval-source-map',
  entry: {
    index: path.join(srcPath, '/index.js'),
    login: path.join(srcPath, '/login.js'),
  },
  output: {
    filename: '[name].js',
    chunkFilename: '[name].[chunkhash:8].js',
    publicPath: '/',
  },
  devServer: {
    historyApiFallback: true,
    disableHostCheck: true,
    contentBase: distPath,
    port: 9000,
  },
  plugins: [
    new HtmlWebpackPlugin({
      filename: 'index.html',
      template: path.join(srcPath, '/index.html'),
      excludeChunks: ['login', 'vendors~login'],
    }),
    new HtmlWebpackPlugin({
      filename: 'login.html',
      template: path.join(srcPath, '/login.html'),
      excludeChunks: ['index', 'vendors~index'],
    }),
    // new BundleAnalyzerPlugin()
  ],
  module: {
    rules: [
      {
        test: /\.html$/,
        loader: 'html-loader',
      },
      {
        test: /\.css$/,
        use: ['style-loader', 'css-loader', 'postcss-loader'],
      },
      {
        test: /\.less$/,
        use: [
          'style-loader',
          'css-loader',
          'postcss-loader',
          {
            loader: 'less-loader',
            options: {
              javascriptEnabled: true,
            },
          },
        ],
      },
      {
        test: /(?!bundle)\.(js|jsx)$/,
        exclude: /node_modules/,
        loader: 'babel-loader',
        options: {
          cacheDirectory: true,
        },
      },
      {
        test: /bundle\.(js|jsx)$/,
        exclude: /node_modules/,
        use: [
          {
            loader: 'bundle-loader',
            options: {
              lazy: true,
              name: '[folder]',
            },
          },
          {
            loader: 'babel-loader',
            options: {
              cacheDirectory: true,
            },
          },
        ],
      },
      {
        test: /\.(png|jpg|gif)$/,
        loader: 'url-loader',
        options: {
          name: '[name].[hash].[ext]',
          limit: 3000,
          publicPath: '/',
        },
      },
      {
        test: /\.woff($|\?)|\.woff2($|\?)|\.ttf($|\?)|\.eot($|\?)/,
        loader: 'url-loader',
        options: {
          limit: 1,
          publicPath: '/',
        },
      },
      {
        test: /\.svg($|\?)/,
        loader: 'url-loader',
        options: {
          limit: 1,
        },
      },
    ],
  },
  optimization: {
    splitChunks: {
      chunks: 'all',
      minSize: 30000,
      minChunks: 1,
      maxAsyncRequests: 5,
      maxInitialRequests: 3,
      automaticNameDelimiter: '~',
      name: true,
      cacheGroups: {
        vendors: {
          test: /[\\/]node_modules[\\/]/,
          priority: -10,
        },
        default: {
          minChunks: 2,
          priority: -20,
          reuseExistingChunk: true,
        },
      },
    },
  },
};

module.exports = config;
