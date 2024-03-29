var path = require('path');
var webpack = require('webpack');
module.exports = {
    devtool: 'source-map',
    entry: {
        app: [
            'babel-polyfill',
            './src/index.js'
        ]
    },
    output: {
        path: path.join(__dirname, 'webjars'),
        filename: 'app-bundle.js'
    },
    resolve: {
        extensions: ['.js', '.jsx']
    },
    plugins: [
        new webpack.LoaderOptionsPlugin({debug: true}),
        new webpack.DefinePlugin({
            "process.env": {
                NODE_ENV: JSON.stringify("development"),
                IS_BROWSER: JSON.stringify( 'true'),
                KEYCLOAK_URL: JSON.stringify(process.env.KEYCLOAK_URL),
                TELEGRAM_BOT_URL: JSON.stringify(process.env.TELEGRAM_BOT_URL)
            }
        })
    ],
    module: {
        rules: [
            {
                test: /\.jsx?$/,
                loader: 'babel-loader',
                exclude: /node_modules/,
                query : {
                    plugins: ["transform-decorators-legacy"],
                    presets: ["env", "react", "es2015", "stage-0"]
                }
	       }
        ]
    },
    devServer: {
        noInfo: false,
        quiet: false,
        lazy: false,
        watchOptions: {
            poll: true
       }
    }
};