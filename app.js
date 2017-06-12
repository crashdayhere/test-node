var express = require('express');


var ImageMiddleware = require ('express-cache-gm-image');
var adaptCall = require('./middlewares/size-adapter.js');
var statistics = require('./middlewares/statistics.js');

const staticOptions = {
    maxAge: 86400000
};


const name =
"      ______          ___   _ __________  _   _ ______  _____  \n" +
"     / __ \\ \\        / / \\ | |___  / __ \\| \\ | |  ____|/ ____| \n" +
"    | |  | \\ \\  /\\  / /|  \\| |  / / |  | |  \\| | |__  | (___   \n" +
"    | |  | |\\ \\/  \\/ / | . ` | / /| |  | | . ` |  __|  \\___ \\  \n" +
"    | |__| | \\  /\\  /  | |\\  |/ /_| |__| | |\\  | |____ ____) | \n" +
"     \\____/   \\/  \\/   |_| \\_/_____\\____/|_| \\_|______|_____/   ";


const app = express();

app.use(adaptCall());
app.use(statistics());

app.get('/statistics', function(req, res){
});

app.get('/*', ImageMiddleware({
    root: './public',
    cacheDir: './cache/imager',
    staticOptions: staticOptions,
    nextFunction: function (req, res) {
        return res.status(404).send('Not Found')
    }
}))

var server = app.listen(3000, function () {
console.log(name);
    console.log('\n Service is running port 3000!')
});


exports.closeServer = function(){
    server.close();
};