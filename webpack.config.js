const path = require('path');
const glob = require('glob');
const HtmlWebPackPlugin = require('html-webpack-plugin');

function getStyleUse(bundleFilename) {
  return [
    {
      loader: 'file-loader',
      options: {
        name: bundleFilename
      }
    },
    { loader: 'extract-loader' },
    { loader: 'css-loader' },
    {
      loader: 'sass-loader',
      options: {
        includePaths: ['./node_modules'],
        implementation: require('dart-sass'),
        fiber: require('fibers')
        // sourceMap: true,

        // // mdc-web doesn't use sass-loader's normal syntax for imports
        // // across modules, so we add all module directories containing
        // // mdc-web components to the Sass include path
        // // https://github.com/material-components/material-components-web/issues/351
        // includePaths: glob
        //   .sync(path.join(__dirname, '**/node_modules/@material'))
        //   .map(dir => path.dirname(dir))
      }
    }
  ];
}

module.exports = [
  {
    entry: './src/index.js',
    output: {
      path: __dirname + '/dist',
      filename: 'bundle.js'
    },
    devServer: {
      contentBase: './dist'
    },
    module: {
      rules: [
        {
          test: /\.(js|jsx)$/,
          exclude: /node_modules/,
          use: ['babel-loader']
        },
        {
          test: /\.html$/,
          use: [
            {
              loader: 'html-loader'
            }
          ]
        },
        {
          test: /\.(jpe?g|png|gif|svg)$/i,
          loader: 'file-loader?name=/public/icons/[name].[ext]'
        }
      ]
    },
    plugins: [
      new HtmlWebPackPlugin({
        template: './public/index.html',
        filename: './index.html'
      })
    ],
    resolve: {
      extensions: ['*', '.js', '.jsx']
    }
  },
  {
    entry: './src/login.scss',
    output: {
      // This is necessary for webpack to compile, but we never reference this js file.
      filename: 'style-bundle-login.js'
    },
    module: {
      rules: [
        {
          test: /login.scss$/,
          use: getStyleUse('bundle-login.css')
        }
      ]
    }
  }
];
