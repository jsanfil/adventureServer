'use strict';

var express = require('express');
var router = express.Router();

var imageController = require('../controllers/imagesController');

// image Routes
router.route('/images')
  .get(imageController.listObjects)
  .post(imageController.singleMulterUpload, imageController.uploadFile);

router.route('/images/:key')
  .get(imageController.getObject)
  .put(imageController.uploadFile)
  .delete(imageController.deleteObject);

  module.exports = router;