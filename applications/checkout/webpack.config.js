const HtmlWebPackPlugin = require("html-webpack-plugin");
const ModuleFederationPlugin = require("webpack/lib/container/ModuleFederationPlugin");
const DashboardPlugin = require('@module-federation/dashboard-plugin')

module.exports = {
  output: {
    publicPath: "http://localhost:8082/",
  },

  resolve: {
    extensions: [".jsx", ".js", ".json"],
  },

  devServer: {
    port: 8082,
    historyApiFallback: true,
  },

  module: {
    rules: [
      {
        test: /\.css$/i,
        use: ["style-loader", "css-loader"],
      },
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        use: {
          loader: "babel-loader",
          options: {
            presets: ["@babel/preset-react"],
          },
        },
      },
    ],
  },

  plugins: [
    new ModuleFederationPlugin({
      name: 'checkout',
      library: { type: "var", name: "checkout" },
      filename: "remoteEntry.js",
      remotes: {
        checkout: 'checkout',
        search: 'search',
        home: 'home',
      },
      exposes: {
        './AddToCart': './src/AddToCart.jsx',
        "./store": './src/store.js',
        "./checkout": './src/checkout.js',
        './CheckoutContent': './src/CheckoutContent.jsx'
      },
      shared: require('./package.json').dependencies,
    }),
    new DashboardPlugin({
      dashboardURL: "http://localhost:3000/api/update",
      metadata: {
        source: {
          url: "http://github.com",
        },
        remote: "http://localhost:8082/remoteEntry.js",
      },
    }),
    new HtmlWebPackPlugin({
      template: "./src/index.html",
    }),
  ],
};
