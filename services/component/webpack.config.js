/* eslint-disable import/no-extraneous-dependencies */
const webpack = require('webpack')
const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const { CleanWebpackPlugin } = require('clean-webpack-plugin')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const merge = require('webpack-merge')
const TerserPlugin = require('terser-webpack-plugin')
const autoprefixer = require('autoprefixer')

const paths = {
  SRC: path.resolve(__dirname, 'src'),
  DEST: path.resolve(__dirname, 'dist'),
}

const common = {
  entry: {
    main: [paths.SRC],
  },
  output: {
    path: paths.DEST,
    publicPath: '/',
    filename: '[name].[hash:8].js',
    chunkFilename: '[name].[chunkhash:8].js',
  },
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        use: ['babel-loader', 'ts-loader'],
      },
      {
        test: /\.js$/,
        use: ['source-map-loader'],
        exclude: [/node_modules/],
        enforce: 'pre',
      },
      {
        test: /\.scss$/,
        use: [
          MiniCssExtractPlugin.loader,
          'css-loader',
          {
            loader: 'postcss-loader',
            options: {
              plugins: () => [autoprefixer()],
            },
          },
          {
            loader: 'sass-loader',
            options: {
              sassOptions: {
                includePaths: ['node_modules'],
              },
            },
          },
        ],
      },
    ],
  },
  resolve: {
    extensions: ['.ts', '.tsx', '.js'],
  },
  plugins: [
    new MiniCssExtractPlugin({ fileName: '[name].[contenthash:8].css' }),
    new HtmlWebpackPlugin({ template: path.join(paths.SRC, 'index.html') }),
    new webpack.NoEmitOnErrorsPlugin(),
  ],
}

const development = {
  mode: 'development',
  devServer: {
    historyApiFallback: true,
    inline: true,
    stats: 'errors-only',
  },
  plugins: [new webpack.LoaderOptionsPlugin({ debug: true }), new webpack.NamedModulesPlugin()],
  devtool: 'cheap-module-source-map',
}

const production = {
  mode: 'production',
  plugins: [
    new CleanWebpackPlugin(),
    new webpack.DefinePlugin({
      'process.env': {
        NODE_ENV: JSON.stringify('production'),
      },
    }),
  ],
  optimization: {
    minimizer: [
      new TerserPlugin({
        cache: true,
        parallel: true,
        sourceMap: true,
      }),
    ],
  },
  devtool: 'source-map',
}

function config(environment) {
  switch (environment) {
    case 'production':
      return merge(common, production)
    default:
      return merge(common, development)
  }
}

module.exports = config(process.env.NODE_ENV)
