const path = require('path');

module.exports = {
    mode: 'development',
    entry: {
        games: '../src/games.js',
        scores: '../src/scores.js',
       
      },
    output: {
        path: path.resolve(__dirname, 'docs/js'),
        filename: '[name].js',
    },
};