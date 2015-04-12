var fs = require('fs');
var got = require('got');
var uc = require('unsplash-crawl');
var wallpaper = require('wallpaper');
var imgDir = '/images/';


function download(url, img) {
  return got(url).pipe(fs.createWriteStream(img));
}

function fileName(path) {
  return path.match(/[^\/]+(?=\/[^\/]+$)/)[0] + '.jpg';
}

function getLatestImage(callback) {
  getImages(function(images) {
    var currentImages = fs.readdirSync(__dirname + imgDir);
    var currentImage;
    images.forEach(function(image) {
      if (!currentImage && currentImages.indexOf(fileName(image)) === -1) {
        currentImage = image;
      }
    });
    callback(undefined, currentImage || images[0]);
  }, 1);
}

function getImages(callback, page) {
  var host = 'https://unsplash.com';
  uc.crawl({start_page: page, end_page: page}, function(err, images) {
    var imagesOnly = images.map(function(image) {
      return image.image_link ? host + image.image_link : null;
    }).filter(function (url) {
      return !!url;
    });

    callback(imagesOnly);
  });
}

function setBackground(img, callback) {
    wallpaper.set(img, function (err) {
      callback(undefined, err);
  });
}

// function setBackground(image, callback) {
//   console.log(image);
//   wallpaper.set(image, callback);
// }

exports.image = getLatestImage;
exports.fileName = fileName;
exports.download = download;
exports.setBackground = setBackground;
