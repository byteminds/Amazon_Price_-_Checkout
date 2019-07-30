const path = require('path');
const src = path.join(__dirname, '/client/src');
const dist = path.join(__dirname, '/client/dist');
const webpack = require('webpack');

module.exports = {
  entry: `${src}/app.jsx`,
  output: {
    filename: `bundle.js`,
    path: dist
  },
  plugins: [
    new webpack.DefinePlugin({ // <-- key to reducing React's size
      'process.env': {
        'NODE_ENV': JSON.stringify('production')
      }
    }),
    new webpack.optimize.AggressiveMergingPlugin() //Merge chunks 
  ],
  module: {
    rules: [
      {
        test: /\.jsx?/,
        include: src,
        use: [
          {
            loader: 'babel-loader',
            options: {
              presets: ['@babel/react']
            }
          }
        ],
      },
      {
        test: /\.css$/,
        use:['style-loader', 'css-loader']
      }
    ]
  }
}