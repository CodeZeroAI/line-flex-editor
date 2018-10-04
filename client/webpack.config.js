const path = require("path");
console.log("dir is "+path.resolve(__dirname));
const config = {
    mode:'development',
    entry: [path.join(__dirname, "/src/index.tsx")],
    output: {
        path: path.resolve(__dirname, "build"),
        filename: "bundle.js"
    },
    resolve: {
        extensions: [".ts", ".tsx", ".js", ".jsx"]
    },

    module: {
        rules: [
            {
                test: /\.tsx?$/,
                loader: "ts-loader",
                exclude: [/node_modules/]
            },
            {
                test: /\.css$/,
                use: [
                    require.resolve('style-loader'),
                    {
                        loader: require.resolve('css-loader'),
                        options: {
                            importLoaders: 1,
                        },
                    },
                    {
                        loader: require.resolve('postcss-loader'),
                        options: {
                            ident: 'postcss', // https://webpack.js.org/guides/migrating/#complex-options
                            plugins: () => [
                                require('postcss-flexbugs-fixes')
                            ],
                        },
                    },
                ],
            },
            {
                exclude: [
                    /\.html$/,
                    // We have to write /\.(js|jsx)(\?.*)?$/ rather than just /\.(js|jsx)$/
                    // because you might change the hot reloading server from the custom one
                    // to Webpack's built-in webpack-dev-server/client?/, which would not
                    // get properly excluded by /\.(js|jsx)$/ because of the query string.
                    // Webpack 2 fixes this, but for now we include this hack.
                    // https://github.com/facebookincubator/create-react-app/issues/1713
                    /\.(js|jsx)(\?.*)?$/,
                    /\.(ts|tsx)(\?.*)?$/,
                    /\.css$/,
                    /\.json$/,
                    /\.bmp$/,
                    /\.gif$/,
                    /\.jpe?g$/,
                    /\.png$/,
                ],
                loader: require.resolve('file-loader'),
                options: {
                    name: 'static/media/[name].[hash:8].[ext]',
                },
            },
        ]
    },
    node: {
        console: true,
        fs: 'empty',
        net: 'empty',
        tls: 'empty'
    }
};

module.exports = config;