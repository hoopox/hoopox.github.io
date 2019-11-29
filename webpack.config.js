var path = require("path");
var webpack = require("webpack");
var CopyWebpackPlugin = require('copy-webpack-plugin');
var HtmlWebpackPlugin = require('html-webpack-plugin');

var configPlugins = [];
var moduleExports = {
    context: __dirname,
    entry: {
        pre: "./common/pre.js",
        post: "./common/post.js"
    },
    output: {
        path: __dirname + "/dist",
        filename: "[name].bundle.js"
    },
    module: {
        loaders: [
            // { test: /\.html$/, exclude: /(404)\.html/, loader: "ng-cache-loader" },
            { test: /\.html$/, loader: "file-loader" },
            { test: /\.ejs$/, loader: "html-webpack-plugin/lib/loader.js" },
            // { test: /\.js$/, exclude: /(node_modules|tmp)/, loader: 'babel-loader' },
            { test: /\.css$/, loader: "style-loader!css-loader?-url" },
            {
                test: /\.(png|jpg|jpeg|woff|woff2|eot|ttf|otf|gif|svg)/,
                loader: 'url-loader'
            },
            // { test: /\.(png|jpg|woff|woff2|eot|ttf|otf|gif)/, loader: 'file?name=[path][name].[ext]' },
            // { test: /\.svg/, loader: 'file?name=/img/[hash].[ext]?' },
            // { test: /\.less/, loader: "style-loader!css-loader!less-loader" },
            { test: /\.scss$/, exclude: /(node_modules|tmp)/, loader: "style-loader!css-loader!sass-loader" },
        ]
    },
    resolve: {
        extensions: ['', '.js', '.json', '.scss']
    },
    plugins: configPlugins
};

configPlugins.push(new CopyWebpackPlugin([
    { from: 'vendors/triangle/template/multicolor/images', to: 'images' },
    { from: 'images', to: 'images' },
    { from: '404.html', to: '404.html' },
    { from: 'vendors/triangle/template/multicolor/fonts', to: 'fonts' },
]));

var layout = require('./common/layout');
require('./pages').forEach(function(page){
    var htmlPlugin = new HtmlWebpackPlugin({
        filename: page.replace(/\//g, '-') + '.html',
        template: page + '.js',
        chunks: [],
        // template: page + '.ejs',
        hash: true,
        // minify: true,
        // xhtml: true,
    });
    configPlugins.push(htmlPlugin);
});

module.exports = moduleExports;
