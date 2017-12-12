const webpack = require('webpack');

module.exports = {
    webpack: function (config, { dev }) {

        config.module.rules.push(
            {
                test: /\.(css)/,
                loader: `emit-file-loader`,
                options: {
                    name: `dist/[path][name].[ext]`
                }
            }
            ,
            {
                test: /\.css$/,
                loader: `babel-loader!raw-loader`
            }
        );

    	config.plugins.push(
            new webpack.DefinePlugin({
                'process.env.NODE_ENV': !dev ? "production" : "development",
            })
		)

        return config
    }
}