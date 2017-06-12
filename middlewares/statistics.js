var fs = require('fs'),
    countFiles = require('count-files'),
    Promise = require('promise'),
    getSize = require('get-folder-size');

module.exports = function () {
    return function (req, res, next) {

        var page = req.url.split('/')[1];

        var settings = {}


        fs.readFile('./public/statistics', 'utf8', function (err, data) {
            if (err) {
                return console.log(err);
            }

            try {
                settings = JSON.parse(data);
            } catch (e) {
                console.log("Settings file not a valid JSON. Creating a fresh one");

                settings = {
                    callsNo: 0,
                    resizesNo: 0,
                    originalNo: 0,
                    cacheHit: 0,
                    cacheSize: "0kb"
                };
            }


            switch (page) {
                case '':
                    return res.status(404).send('');
                    next();
                    break;

                case 'statistics':
                    res.send(settings);
                    next();
                    break;

                case 'images':

                    var imageName = req._parsedUrl.pathname.split('/')[2];
                    var qparams = req.query;
                    var fileParams = "";

                    settings.callsNo += 1;

                    //creating the file name parameters ex: w200h200c1x100y100r1
                    //region File parameters name

                    // console.log(req);


                    if (typeof qparams.w != 'undefined') {
                        fileParams += 'w' + qparams.w;
                    }

                    if (typeof qparams.h != 'undefined') {
                        fileParams += 'h' + qparams.h;
                    }

                    if (typeof qparams.c != 'undefined') {
                        fileParams += 'c' + qparams.c;
                    }

                    if (typeof qparams.x != 'undefined') {
                        fileParams += 'x' + qparams.x;
                    }

                    if (typeof qparams.y != 'undefined') {
                        fileParams += 'y' + qparams.y;
                    }

                    if (typeof qparams.r != 'undefined') {
                        fileParams += 'r' + qparams.r;
                    }

                    fileParams += '.' + imageName.split('.')[1];

                    //endregion


                    if (fs.existsSync('./cache/imager/images|' + imageName + '/' + fileParams)) {
                        settings.cacheHit += 1;
                    }

                    //region promises
                    var promiseOriginal = new Promise(function (resolve, reject) {

                        countFiles('./public/images', function (err, results) {

                            if (err) reject(err)
                            else {
                                settings.originalNo = results.files;
                                resolve(res);
                            }
                        });
                    });

                    var promiseCache = new Promise(function (resolve, reject) {

                        countFiles('./cache/imager', function (err, results) {
                            if (err) reject(err)
                            else {
                                settings.resizesNo = results.files;
                                resolve(res);
                            }
                        });
                    });


                    var promiseCacheSize = new Promise(function (resolve, reject) {
                        getSize('./cache/imager', function (err, size) {
                            if (err) {
                                reject(err);
                            }

                            settings.cacheSize = (size / 1024).toFixed(2) + ' Kb';
                            resolve(res);
                        });
                    });
                    //endregion

                    Promise.all([promiseOriginal, promiseCache, promiseCacheSize])
                        .then(function (res) {

                            fs.writeFile('./public/statistics', JSON.stringify(settings), function (err) {
                                if (err) {
                                    return console.log(err);
                                }
                            });

                            next();
                        });

                    break;
            }

        });

    }

}
