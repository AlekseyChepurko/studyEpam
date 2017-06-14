/**
 * Created by Алексей on 14.06.2017.
 */
/**
 * Created by Алексей on 09.06.2017.
 */
const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const ChunkManifestPlugin = require("chunk-manifest-webpack-plugin");
const WebpackChunkHash = require("webpack-chunk-hash");
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;
const WebpackCleanupPlugin = require('webpack-cleanup-plugin');
const ExtractTextPlugin = require("extract-text-webpack-plugin");
const extractSass = new ExtractTextPlugin({
    filename: "css/[name].[contenthash].css",
    // disable: process.env.NODE_ENV === "development"
});
const webpack = require('webpack'); //to access built-in plugins


const pages = [
    'odm',
    'main'
];
const paths = {
    templates: './src/templates/',
    styles: './src/styles/',
    scripts: './src/scripts/',
    images: './src/img/'
};

console.log(process.env.NODE_ENV);

const plugins = [
    extractSass,
    new webpack.optimize.CommonsChunkPlugin({
        name: ["vendor", "manifest"], // vendor libs + extracted manifest
        minChunks: function (module) {
            // this assumes your vendor imports exist in the node_modules directory
            return module.context && module.context.indexOf('node_modules') !== -1;
        }
    }),
    new webpack.optimize.CommonsChunkPlugin({
        name: 'manifest' //But since there are no more common modules between them we end up with just the runtime code included in the manifest file
    }),
    new WebpackChunkHash(),
    new WebpackCleanupPlugin(),
    new ChunkManifestPlugin({
        filename: "chunk-manifest.json",
        manifestVariable: "webpackManifest",
        inlineManifest: true
    }),
    new webpack.HotModuleReplacementPlugin(),
    new BundleAnalyzerPlugin({openAnalyzer: true})
];
const pagePlugins = pages.map(item =>
    new HtmlWebpackPlugin({
        template: paths.templates+item+'.pug',
        filename: item+'.html',
        chunks: ["manifest",item]
    })
);
plugins.unshift(...pagePlugins);

let entries = {
    // vendor: ['react'],
};

// TODO wraitable for.... what?
pages.forEach(page => {
    Object.defineProperty(entries, page, {
        value: paths.scripts+page+'.js',
        enumerable: true,
        writable: true
    })
});
module.exports = {
    entry: entries,
    output: {
        path: path.resolve(__dirname, 'build'),
        filename: "[name].[hash].js",
        chunkFilename: "[name].[hash].js",
        // publicPath: "/assets/"
    },
    devtool: process.env.NODE_ENV==="production" ? "nosources-source-map" : "cheap-eval-source-map",
    plugins: plugins,
    module: {
        rules: [
            {
                test: /\.pug/,
                use: [
                    'pug-loader',
                ]
            },
            {
                test: /\.s[ac]ss$/,
                use: extractSass.extract({
                    use: [{
                        loader: "css-loader",
                    }, {
                        loader: "sass-loader"
                    }],
                    // use style-loader in development
                    fallback: "style-loader"
                })
            },
            {
                test: /\.css$/,
                use: [
                    'style-loader',
                    'css-loader'
                ]
            },
            {
                test: /\.(png|svg|jpg|gif)$/,
                use: [
                    'file-loader?hash=sha512&digest=hex&name=[hash].[ext]&outputPath=assets/imgs/',
                    'image-webpack-loader?bypassOnDebug&optimizationLevel=7&interlaced=false'
                ]
            },
            {
                test: /\.(woff|woff2|eot|ttf|otf)$/,
                use: [
                    'file-loader?name=[name].[ext]&outputPath=assets/fonts/'
                ]
            }
        ]
    },
    devServer: {
        contentBase: path.join(__dirname, 'build'),
        compress: true,
        stats: "errors-only",
        open: true,
        hot: true,
        historyApiFallback: {
            index: 'main.html'
        }
    },
    resolve: {
        alias:{
            Styles: path.resolve(__dirname, 'src/styles')
        }
    }
};