'use strict';

var mongoose = require('mongoose'),
  Profile = mongoose.model('Profiles'),
  MongoQS = require('mongo-querystring');

exports.listProfiles = function(req, res) {
  
  var query = new MongoQS().parse(req.query);
  console.log("Query:", query);
  Profile.find(query).sort({updatedAt: -1}).limit(50).exec(function(err, profile) {
    if (err)
      res.send(err);
    console.log(profile)  
    res.json(profile);
  });
};

exports.createProfile = function(req, res) {
  var newProfile = new Profile(req.body);
  newProfile.save(function(err, profile) {
    if (err)
      res.send(err);
    res.json(profile);
  });
};

exports.readProfile = function(req, res, next) {
    Profile.findById(req.params.profileId, function(err, profile) {
      if (err) return next(err);
      res.json(profile);
    });
  };
  
  exports.updateProfile = function(req, res) {
    Profile.findOneAndUpdate({_id: req.params.profileId}, req.body, {new: true}, function(err, profile) {
      if (err)
        res.send(err);
      res.json(profile);
    });
  };
  
  exports.deleteProfile = function(req, res) {
    Profile.remove({
      _id: req.params.profileId
    }, function(err, profile) {
      if (err)
        res.send(err);
      res.json({ message: 'Profile successfully deleted' });
    });
};
