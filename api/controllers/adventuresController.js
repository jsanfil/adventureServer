'use strict';

var mongoose = require('mongoose'),
  Adventure = mongoose.model('Adventures'),
  MongoQS = require('mongo-querystring');

// GET adventures. Not used in app
exports.listAdventures = function(req, res, next) {
  
  var query = new MongoQS().parse(req.query);
  console.log("Query:", query);
  Adventure.find(query).sort({updatedAt: -1}).limit(50).exec(function(err, adventure) {
    if (err) return next(err);
    console.log(adventure)  
    res.json(adventure);
  });
};

// List adventures for FirstViewController
// select * from adventures where
//     ((location within radius)
//     AND 
//     ((access = Private AND author = me) || 
//      (access = Sidekicks AND author = me) ||
//      (access = Sidekicks AND acl = me) ||
//      (access = Public)))
exports.listAdventuresGeo = function(req, res, next) {
  
  var queryStr = new MongoQS().parse(req.query);
  console.log("Query:", queryStr);
  console.log("User", req.user);
  Adventure.find({
    location :
    { $near :
      { $geometry :
         { type : "Point" ,
           coordinates : [ queryStr.longitude, queryStr.latitude] } ,
        $maxDistance : queryStr.distance
    } } , 
    $or: [
    {access: "Private", author: req.user.username},
    {access: "Sidekicks", acl: req.user.username},
    {access: "Sidekicks", author: req.user.username},
    {access: "Public"} ]
    }).
    sort({updatedAt: -1}).
    limit(50).
    exec(function(err, adventure) {
    if (err) return next(err);
    console.log(adventure)  
    res.json(adventure);
  });
};

// List adventures for FirstViewController when "Sidekicks only" is checked.
// This is part of the logic to list adventures where the users are my sidekicks
// and they have also posted adventures with me as their sidekick. (i.e mutual sidekicks)
// The app provides my list of sidekicks as input to the query.
// select * from adventures where
//     ((location within radius)
//     AND
//      (author = [my list of sidekicks])
//     AND
//      ((access = Public) || 
//      (access = Sidekicks AND acl = me))) // This clause ensures mutual sidekicks
exports.listAdventuresGeoSidekicksOnly = function(req, res, next) {
  
  var queryStr = new MongoQS().parse(req.query);
  console.log("QueryStr:", queryStr);
  console.log("User", req.user);
  var query = {
    location :
    { $near :
      { $geometry :
         { type : "Point" ,
           coordinates : [ queryStr.longitude, queryStr.latitude] } ,
        $maxDistance : queryStr.distance
    } },
    author: queryStr.sidekicks,
    $or: [
    {access: "Public"},
    {access: "Sidekicks", acl: req.user.username} ]
  };
  console.log("Query:", query);
  Adventure.find(query).
    sort({updatedAt: -1}).
    limit(50).
    exec(function(err, adventure) {
    if (err) return next(err);
    console.log(adventure)  
    res.json(adventure);
  });
};

// List adventures for a single user coming from either FourthViewController
// or from my Sidekicks list
exports.listAdventuresSidekicks = function(req, res, next) {
  
  var queryStr = new MongoQS().parse(req.query);
  console.log("Query:", queryStr);
  console.log("User", req.user);
  Adventure.find({
    $or: [
    {access: "Public", author: queryStr.author},
    {access: "Sidekicks", author: queryStr.author, acl: req.user.username} ]
    }).
    sort({updatedAt: -1}).
    limit(50).
    exec(function(err, adventure) {
    if (err) return next(err);
    console.log(adventure)  
    res.json(adventure);
  });
};

// List adventures based on an array of adventure ID's. Part of the logic 
// to list all adventures that I have marked as my favorites
exports.listAdventuresFavorites = function(req, res, next) {
  
  var queryStr = new MongoQS().parse(req.query);
  console.log("User", req.user);
  // The client sends an array of adventure ID's in the exact format needed for the query
  var ids = req.body;
  var query = {};
  query._id = ids;
  console.log("Query", query);
  Adventure.find(query).
    sort({updatedAt: -1}).
    limit(50).
    exec(function(err, adventure) {
    if (err) return next(err);
    console.log(adventure)  
    res.json(adventure);
  });
};

// Create adventure. Used by ThirdViewController to POST new adventures
exports.createAdventure = function(req, res, next) {
  var newAdventure = new Adventure(req.body);
  newAdventure.save(function(err, adventure) {
    if (err) return next(err);
    res.json(adventure);
  });
};

// Read Adventure. Used to get the details of one adventure
exports.readAdventure = function(req, res, next) {
    Adventure.findById(req.params.adventureId, function(err, adventure) {
      if (err) return next(err);
      res.json(adventure);
    });
  };
  
  // Update Adventure. Used to update ratings
  exports.updateAdventure = function(req, res, next) {
    Adventure.findOneAndUpdate({_id: req.params.adventureId}, req.body, {new: true}, function(err, adventure) {
      if (err) return next(err);
      res.json(adventure);
    });
  };
  
  // Delete Adventure.
  exports.deleteAdventure = function(req, res, next) {
    Adventure.remove({
      _id: req.params.adventureId
    }, function(err, adventure) {
      if (err) return next(err);
      res.json({ message: 'Adventure successfully deleted' });
    });
};
