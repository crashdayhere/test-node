var request = require('request'),
    assert = require('assert'),
    microservice = require('../app.js'),
    base_url = 'http://localhost:3000/',
    sizeOf = require('image-size'),
    url = require('url'),
    http = require('http');


describe('Image Service Server TEST', function () {


    it('returns scaled image', function (done) {
        var imgUrl = base_url + 'images/testImage1.jpeg?w=200ex&h=300';
        var options = url.parse(imgUrl);

        http.get(options, function (response) {
            var chunks = [];
            response.on('data', function (chunk) {
                chunks.push(chunk);
            }).on('end', function () {
                var buffer = Buffer.concat(chunks);
                var size = sizeOf(buffer);

                var imageChecks = false;

                if (size.width = 200 && size.height == 209) {
                    imageChecks = true
                }
                assert.fail(1, 2, 'Resized image does not match', '>');
                done();
            });
        });
    });


    it('returns statistics', function (done) {
        request.get(base_url + 'statistics', function (error, response, body) {

            if (typeof JSON.parse(body).callsNo > 0) {
                done();
            } else {
                assert.fail(1, 2, 'The', '>');
            }


        });
    });


    it('returns status code 404 on index', function (done) {
        request.get(base_url, function (error, response, body) {
            assert.equal(404, response.statusCode);
            done();
        });
    });


});