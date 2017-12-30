const path =require('path');

var config = {
   entry: './main.js',
   
   output: {
      path: path.resolve(__dirname, 'dist'),
      filename: 'bundle.js',
   },
   
   devServer: {
     contentBase: path.join(__dirname, 'dist'),
      inline: true,
      port: 8080,
      historyApiFallback: true
   },
   
   module: {
      loaders: [
         {
            test: /\.jsx?$/,
            exclude: /node_modules/,
            loader: 'babel-loader',
            
            query: {
               presets: ['es2015', 'react']
            }
         },

         {
            test: /\.css$/,
            loader: 'style-loader'
          }, 
          
          {
            test: /\.css$/,
            loader: 'css-loader',
            // query: {
            //   modules: true,
            //   localIdentName: '[name]__[local]___[hash:base64:5]'
            // }
          },


      ]
   }
}

module.exports = config;