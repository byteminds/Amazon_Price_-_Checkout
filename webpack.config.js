const path = require('path');
const src = path.join(__dirname, '/client/src');
const dist = path.join(__dirname, '/client/dist');

module.exports = {
  entry: `${src}/app.jsx`,
  output: {
    filename: `bundle.js`,
    path: dist
  },
  module: {
    loaders: [
      {
        test: /\.jsx?/,
        include: src,
        loader: `babel-loader`,
        query: {
          presets: [`react`, `es2015`]
        }
      },
      {
        test: /\.css$/,
        use:['style-loader', 'css-loader']
      }
    ]
  }
}