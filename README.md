# Sodexo Interaktiv Web

### Version
0.1.0

### Tech

* [node.js] - A framework for creating ambitions web applications.
* [expressjs] - Minimal and flexible Node.js web application framework for web and mobile applications.
* [imagemagick] - Minimal and flexible Node.js web application framework for web and mobile applications.
* Other

### Installation

First install nodejs, you can download it from:
https://nodejs.org/en/download/

After that you need ImageMagick. For instalation please visit:
http://www.imagemagick.org/script/download.php

In Mac OS X, you can simply use Homebrew and do:

```sh
brew install imagemagick
```

Then run:

```sh
$ npm install
```

For testing install mochajs:

```npm install --global mocha``

### How to use

To run the test run:
``$ npm test``

To start the server run:
``$ node app.js``

A request looks like this:

``
http://127.0.0.1:3000/images/cat1.jpeg?size=200x200&c=1&r=1&x=100&y=100
``


Instead of `&size` you can use:
``
&w=200&h=200
``



The get parameters:
```
size = size of the final image

w = widht of final image

h = height of final image

r = resize (optional if you don't use crop)

c = crop

x = how many pixels to remove fom the width

y = how many pixels to remove from the height
```




### License

   [node.js]: <https://nodejs.org/en/>
   [Express.js]: <https://expressjs.com/>
   [imagemagick]: <https://www.imagemagick.org/script/index.php>

