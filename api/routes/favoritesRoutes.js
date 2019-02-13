'use strict';

var express = require('express');
var router = express.Router();

var favoriteController = require('../controllers/favoritesController');
var passport = require('passport');

// favorite Routes
router.route('/favorites')
  .get(favoriteController.listFavorites)
  .post(favoriteController.createFavorite);

router.route('/favorites/:favoriteId')
  .get(favoriteController.readFavorite)
  .put(favoriteController.updateFavorite)
  .delete(favoriteController.deleteFavorite);

  module.exports = router;
