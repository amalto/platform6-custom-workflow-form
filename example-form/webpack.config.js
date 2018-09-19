const path = require('path');

module.exports = {
    entry: path.resolve(__dirname, './src/form.tsx'),
    output: {
        filename: 'bundle.js',
        path: path.resolve(__dirname, './build')
    },
    resolve: {
        extensions: ['.webpack.js', '.web.js', '.ts', '.tsx', '.js', '.jsx', '.json', '.scss', '.css']
    },
    externals: {
        'jquery': 'jQuery',
        'pikaday': 'Pikaday',
        'moment': 'moment',
        'react': 'React',
        'react-dom': 'ReactDOM',
        '@amalto/platform6-ui': 'platform6'
    },
    module: {
        rules: [
            {
                test: /\.tsx?$/,
                loader: 'babel-loader!ts-loader'
            },
            {
                test: /\.json$/,
                loader: 'json-loader'
            }
        ]
    },
    node: { fs: 'empty' }
};
