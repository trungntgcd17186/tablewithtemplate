var HtmlWebpackInlineSourcePlugin = require('html-webpack-inline-source-plugin')

module.exports = {
  entry: './index.js',
  output: {
    filename: './bundle.js',
  },
  resolve: {
    plugins: [
      new HtmlWebpackPlugin(),
      new HtmlWebpackInlineSourcePlugin(HtmlWebpackPlugin),
    ],
  },
}
