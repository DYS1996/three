const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const dir = __dirname;

module.exports = {
    devtool: 'source-map',
    module: {
        rules: [
            {
                test: /\.js$/,
                use: 'babel-loader',
                exclude: path.resolve(dir, './node_modules/'),
            },
            {
                test: /\.(jpe?g|png|gif|svg|tga|pcb|pcd|prwm|mat|mp3|ogg)$/i,
                use: 'url-loader',
                exclude: path.resolve(dir, './node_modules/'),
            },
            {
                test: /\.(vert|frag|glsl|shader|txt)$/i,
                use: 'raw-loader',
                exclude: path.resolve(dir, './node_modules/'),
            },
            {
                test: /\.(glb|gltf|fbx|obj|svg|mat|mtl|babylon)/i,
                use: 'file-loader',
                exclude: path.resolve(dir, './node_modules'),
            },
        ],
    },
    plugins: [
        new HtmlWebpackPlugin({
            template: path.resolve(dir, './src/html/index.html'),
        }),
    ],
};
