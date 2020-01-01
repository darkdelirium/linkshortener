/*
    ./webpack.config.js
*/

// Imports: Dependencies
const path = require("path");
require("babel-register");
var HtmlWebpackPlugin = require("html-webpack-plugin");

// Webpack Configuration
const config = {
  // Entry
  entry: "./src/index.js",

  // Output
  output: {
    path: path.resolve(__dirname, "dist"),
    filename: "bundle.js"
  },

  // Loaders
  module: {
    rules: [
      // JavaScript/JSX Files
      {
        test: /\.jsx$/,
        exclude: /node_modules/,
        use: ["babel-loader"]
      },
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: ["babel-loader"]
      },
      // CSS Files
      {
        test: /\.css$/,
        loader: "style-loader!css-loader?modules"
      },
      {
        test: /\.(png|jp(e*)g|svg|gif)$/,
        use: [
          {
            loader: "file-loader"
          }
        ]
      },
      {
        test: /\.(scss)$/,
        use: [
          {
            loader: "style-loader" // inject CSS to page
          },
          {
            loader: "css-loader" // translates CSS into CommonJS modules
          },
          {
            loader: "postcss-loader", // Run post css actions
            options: {
              plugins: function() {
                // post css plugins, can be exported to postcss.config.js
                return [require("precss"), require("autoprefixer")];
              }
            }
          },
          {
            loader: "sass-loader" // compiles Sass to CSS
          }
        ]
      }
    ]
  },

  // Plugins
  plugins: [new HtmlWebpackPlugin({ template: "./src/index.html" })]
};

// Exports
module.exports = config;

/*
const HtmlWebpackPlugin = require("html-webpack-plugin");
const HtmlWebpackPluginConfig = new HtmlWebpackPlugin({
  template: "./src/index.html",
  filename: "index.html",
  inject: "body"
})



module.exports = {
  entry: "./src/index.js",
  output: {
    path: __dirname + "/dist",
    filename: 'index_bundle.js'
  },
  module: {
    loaders: [
      { test: /\.js$/, loader: "babel-loader", exclude: [/node_modules/, /dist/] },        
      { test: /\.jsx?$/, loader: "babel-loader", exclude: [/node_modules/, /dist/] },
      { test: /\.css$/, loader: ["style-loader", "css-loader", "less-loader", "sass-loader"]},
      { test: /\.gif$/, loader: "url-loader?limit:10240&mimetype=image/gif" },
      { test: /\.jpg/, loader: "url-loader?limit:10240&mimetype=image/jpg" },
      { test: /\.jpeg$/, loader: "url-loader?limit:10240&mimetype=image/jpg" },
      { test: /\.png$/, loader: "url-loader?limit:10240&mimetype=image/png" },
      { test: /\.svg$/, loader: "url-loader?limit:10240&mimetype=image/svg+xml" },
      { test: /\.json$/, loader: "json-loader" }
    ]
  },
  // add this line
  plugins: [HtmlWebpackPluginConfig]
}

*/
