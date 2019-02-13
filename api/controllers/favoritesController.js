'use strict';

var mongoose = require('mongoose'),
  Favorite = mongoose.model('Favorites'),
  MongoQS = require('mongo-querystring');


exports.listFavorites = function(req, res, next) {
  var query = new MongoQS().parse(req.query);
  console.log("Query:", query);
  Favorite.find(query).sort({updatedAt: -1}).limit(50).exec(function(err, favorite) {
    if (err) return next(err);
    console.log(favorite);  
    res.json(favorite);
  });
};

exports.createFavorite = function(req, res, next) {
  var newFavorite = new Favorite(req.body);
  newFavorite.save(function(err, favorite) {
    if (err) return next(err);
    res.json(favorite);
  });
};

exports.readFavorite = function(req, res, next) {
    Favorite.findById(req.params.favoriteId, function(err, favorite) {
      if (err) return next(err);
      res.json(favorite);
    });
};
  
exports.updateFavorite = function(req, res, next) {
    Favorite.findOneAndUpdate({_id: req.params.favoriteId}, req.body, {new: true}, function(err, favorite) {
        if (err) return next(err);
        res.json(favorite);
    });
};
  
exports.deleteFavorite = function(req, res, next) {
    Favorite.remove({
      _id: req.params.favoriteId
    }, function(err, favorite) {
        if (err) return next(err);
        res.json({ message: 'Favorite successfully deleted' });
    });
};
