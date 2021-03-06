import path from 'path'
import webpack from 'webpack'
import ExtractTextPlugin from 'extract-text-webpack-plugin'
import merge from 'webpack-merge'<% if (projectvue === true ) { %>
import vueutils from './build/vue-utils'<% } %>
import yargs from 'yargs'
import eslintPretty from 'eslint-formatter-pretty'
import kittnConf from './config.json'

const argv = yargs.argv
const env = argv.env || 'development'
const nodeEnv = process.env.NODE_ENV || 'production'
const bundle = env[0].bundle || 'primary'

const ROOT_PATH = path.resolve(__dirname)
const PUBLIC_PATH = path.join(ROOT_PATH, 'dist/')
const ASSET_JS_PATH = kittnConf.dist.webpackjsassets<% if (projecttypescript) { %>

const PRIMARY_FILE_NAME = 'app.ts'<% } else { %>
const PRIMARY_FILE_NAME = 'app.js'<% } %>
const PRIMARY_FILE_NAME_OUTPUT = 'app.js'
const PRIMARY_FILE_HANDLE = 'app'

// Different Config Sections
const configSelect = bundle => {
  switch (bundle) {
    case 'primary':
      return {
        entry: [`./js/${PRIMARY_FILE_NAME}`],
        output: {
          path: path.join(PUBLIC_PATH, ASSET_JS_PATH),
          publicPath: `/${ASSET_JS_PATH}`,
          filename: PRIMARY_FILE_NAME_OUTPUT
        }
      }
      break

    // Add More Cases is you need

    case 'production' :
      return {
        entry: {
          app: `./js/${PRIMARY_FILE_NAME}`
          // Adding more Files here
        },
        output: {
          path: path.join(PUBLIC_PATH, ASSET_JS_PATH),
          filename: '[name].js'
        }
      }
      break

    default :
      return true
  }
}

const configSegment = configSelect(bundle)

// Webpack Config
const config = {
  devtool: 'source-map',
  context: path.join( ROOT_PATH, 'src'),
  entry: configSegment.entry,
  output: configSegment.output,
  module: {

    rules: [<% if (projectvue === true ) { %>
      {
        enforce: 'pre',
        test: /\.vue$/,
        loader: 'eslint-loader',
        include: path.join( ROOT_PATH, 'src/js' ),
        exclude: /node_modules/
      },<% } %>{
        enforce: 'pre',
        test: /\.js$/,
        loader: 'eslint-loader',
        include: path.join( ROOT_PATH, 'src/js' ),
        exclude: /node_modules/
      },<% if (projectvue === true ) { %>{
        test: /\.vue$/,
        include: path.join( ROOT_PATH, 'src/js' ),
        loader: 'vue'
      },<% } %>{
        test: /\.js$/,
        include: path.join( ROOT_PATH, 'src/js' ),
        exclude: /node_modules/,
        loader: 'babel'
      }<% if (projecttypescript) { %>,{
        test: /\.ts$/,
          include: path.join( ROOT_PATH, 'src/js' ),
          exclude: /node_modules/,
          loader: 'awesome-typescript-loader'
      }<% } %>
    ]
  },

  plugins: [
    new webpack.DefinePlugin({
      'process.env': {
        NODE_ENV: JSON.stringify(nodeEnv)
      }
    }),
    new webpack.optimize.OccurrenceOrderPlugin(),
    new webpack.NoErrorsPlugin(),
    new webpack.LoaderOptionsPlugin({
      options: {
        eslint: {
          failOnError  : false,
          failOnWarning: false,
          configFile   : './.eslintrc',
          formatter    : require('eslint-formatter-pretty')
        }<% if (projectvue === true ) { %>,
        vue: {
          loaders: vueutils.cssLoaders({ sourceMap: false }),
            postcss: [
            require('autoprefixer')({
              browsers: ['last 2 versions']
            })
          ]
        }<% } %>
      }
    })
  ],

  resolve: {
    extensions: [<% if (projectvue === true ) { %>
      '.vue',<% } if (projecttypescript) { %>
      '.ts',<% } %>
      '.js'
    ],
    alias: {<% if (projectvue === true && projectvueversion === 'Standalone' ) { %>
      'vue': 'vue/dist/vue.js'<% } %>
    }
  },

  externals: {
    'Modernizr': 'Modernizr'
  }
}

if(env == 'development') {
  const DashboardPlugin = require('webpack-dashboard/plugin')

  module.exports = merge(config, {
    entry: [
      'webpack/hot/dev-server',
      'webpack-hot-middleware/client'
    ],
    plugins: [
      new DashboardPlugin({ port: 3002 }),
      new webpack.HotModuleReplacementPlugin()
    ]
  })
} else {
  module.exports = merge(config)
}
