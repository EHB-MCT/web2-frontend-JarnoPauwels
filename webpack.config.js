const path = require('path');

module.exports = {
    mode: 'development',
    entry: {
        search: './src/games.js',
        watchlist: './src/scores.js',
       
      },
    output: {
        path: path.resolve(__dirname, 'docs/js'),
        filename: '[name].js',
    },
};