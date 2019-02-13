'use strict';

var mongoose = require('mongoose'),
  Message = mongoose.model('Messages'),
  MongoQS = require('mongo-querystring');


exports.listMessages = function (req, res, next) {
  var query = new MongoQS().parse(req.query);
  console.log("Query:", query);
  Message.find(query).sort({ updatedAt: -1 }).limit(50).exec(function (err, message) {
    if (err) return next(err);
    console.log(message);
    res.json(message);
  });
};

exports.createMessage = function (req, res, next) {
  var newMessage = new Message(req.body);
  newMessage.save(function (err, message) {
    if (err) return next(err);
    console.log(message);
    res.json(message);
  });
};

exports.readMessage = function (req, res, next) {
  Message.findById(req.params.messageId, function (err, message) {
    if (err) return next(err);
    res.json(message);
  });
};

exports.updateMessage = function (req, res, next) {
  Message.findOneAndUpdate({ _id: req.params.messageId }, req.body, { new: true }, function (err, message) {
    if (err) return next(err);
    res.json(message);
  });
};

exports.deleteMessage = function (req, res, next) {
  Message.remove({
    _id: req.params.messageId
  }, function (err, message) {
    if (err) return next(err);
    res.json({ message: 'Message successfully deleted' });
  });
};
