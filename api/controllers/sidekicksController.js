'use strict';

var mongoose = require('mongoose'),
  Sidekick = mongoose.model('Sidekicks'),
  MongoQS = require('mongo-querystring');

exports.listSidekicks = function(req, res) {
  
  var query = new MongoQS().parse(req.query);
  console.log("Query:", query);
  Sidekick.find(query).sort({updatedAt: -1}).limit(50).exec(function(err, sidekick) {
    if (err)
      res.send(err);
    console.log(sidekick)  
    res.json(sidekick);
  });
};

exports.createSidekick = function(req, res) {
  var newSidekick = new Sidekick(req.body);
  newSidekick.save(function(err, sidekick) {
    if (err)
      res.send(err);
    res.json(sidekick);
  });
};

exports.readSidekick = function(req, res, next) {
    Sidekick.findById(req.params.sidekickId, function(err, sidekick) {
      if (err) return next(err);
      res.json(sidekick);
    });
};
  
exports.updateSidekick = function(req, res) {
    Sidekick.findOneAndUpdate({_id: req.params.sidekickId}, req.body, {new: true}, function(err, sidekick) {
      if (err)
        res.send(err);
      res.json(sidekick);
    });
};
  
exports.deleteSidekick = function(req, res) {
    Sidekick.remove({
      _id: req.params.sidekickId
    }, function(err, sidekick) {
      if (err)
        res.send(err);
      res.json({ message: 'Sidekick successfully deleted' });
    });
};
