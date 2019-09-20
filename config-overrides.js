const HtmlWebpackPlugin = require('html-webpack-plugin')

module.exports = function override(config, env) {
  // 修改入口
  config.entry = {
    index: './src/index/index.js',
    query: './src/query/index.js',
    ticket: './src/ticket/index.js',
    order: './src/order/index.js'
  }

  // 修改plugins
  config.plugins = [
    new HtmlWebpackPlugin({
      template:'./public/index.html',
      filename:'index.html',
      chunks:['index']
    }),
    new HtmlWebpackPlugin({
      template:'./public/query.html',
      filename:'query.html',
      chunks:['query']
    }),
    new HtmlWebpackPlugin({
      template:'./public/ticket.html',
      filename:'ticket.html',
      chunks:['ticket']
    }),
    new HtmlWebpackPlugin({
      template:'./public/order.html',
      filename:'order.html',
      chunks:['order']
    })
  ]

  return config
}
