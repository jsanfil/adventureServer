'use strict';
var mongoose = require('mongoose');
var Schema = mongoose.Schema;


var MessageSchema = new Schema({
  username: {
    type: String,
    required: 'Please enter the username of the Message'
  },
  msgType: String, // ReportPost, Support, DeleteAccount
  body: String
},
  {timestamps: true}
);

module.exports = mongoose.model('Messages', MessageSchema);