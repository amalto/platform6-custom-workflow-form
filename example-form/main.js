const webpack = require('webpack');
const express = require('express');
const configuration = require('./webpack.config.js');

const PORT = 9090;

const app = express();

app.use(function (req, res, next) {

    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, X-HTTP-Method-Override, Content-Type, Accept, Authorization");

    if (req.method === 'OPTIONS') {
        var headers = {};
        headers["Access-Control-Allow-Origin"] = "*";
        headers["Access-Control-Allow-Methods"] = "POST, GET, PUT, DELETE, OPTIONS";
        headers["Access-Control-Allow-Headers"] = "Origin, X-Requested-With, X-HTTP-Method-Override, Content-Type, Accept, Authorization";
        res.writeHead(200, headers);
        res.end();
    } else {
        next();
    }

});

app.use(express.static('./build'));
app.listen(PORT);

console.log(`${new Date()} Bundled files will be served on localhost:${PORT}\n`);

webpack(configuration).watch({}, (err, stats) => {
    const { compilation } = stats;
    const { errors, namedChunks, warnings } = compilation;

    if (err) {
        console.error(err);
        return;
    }

    Object
        .keys(namedChunks)
        .forEach(c => console.log(`${new Date()} OUTPUT ${c}: ${namedChunks[c].files}\n`));

    errors.forEach(e => console.log('\x1b[31m%s\x1b[0m', `${new Date()} ERROR ${buildErrorWarning(e)}`));
    warnings.forEach(e => console.log('\x1b[33m%s\x1b[0m', `${new Date()} WARNING ${buildErrorWarning(e)}`));

    if (errors.length + warnings.length === 0) console.log('\x1b[32m%s\x1b[0m', `${new Date()} SUCCESS\n`)
});

function buildErrorWarning(e) {
    const { location, module } = e;

    const errorLocation = location ? `[${location.line}, ${location.character}]` : '';
    const moduleFile = module ? `${module.resource} ` : '';

    return `${moduleFile}${errorLocation}:\n${e.message}\n`;
}
