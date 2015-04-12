var test = require('tape');
var fs = require('fs');
var ub = require('./index');

test('fileName', function(t) {
  t.equal(ub.fileName('/asdf/asdf/test/download'), 'test.jpg');
  t.equal(ub.fileName('https://unsplash.com/photos/test/download'), 'test.jpg');
  t.end();
});

test('latest image', function(t) {

  t.plan(2);
  t.ok(ub.image, 'is defined');
  ub.image(function(err, image) {
   if (err) {
     t.ok(false, err);
    return;
   }
   t.ok(image, 'image is ok');
  }, 'image');

});

test('download', function(t) {

  t.plan(3);
  t.equal(typeof ub.download, 'function');
  var url = 'https://unsplash.com/photos/dfZbts6B4yw/download';
  var fileName = ub.fileName(url);
  var fullImage = __dirname + '/images/' + fileName;

  t.ok(ub.download(url, fullImage), 'download file: ' + fullImage);
  t.ok(fs.existsSync(fullImage), 'file was downloaded');

});

test('set background image', function(t) {
  t.plan(2);
  var fullImage = __dirname + '/images/dfZbts6B4yw.jpg';
  t.ok(fs.existsSync(fullImage), 'file was downloaded');
  ub.setBackground(fullImage, function(err) {
    console.log('donut', err);
    t.ok(!err, 'no error setting iamge');
  });

});
