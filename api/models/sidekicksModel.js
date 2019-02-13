'use strict';
var mongoose = require('mongoose');
var Schema = mongoose.Schema;


var SidekickSchema = new Schema({
  username: {
    type: String,
    required: 'Please enter the name of the Sidekick'
  },
  sidekickName: String,
  sidekickImage: String,
},
  {timestamps: true}
);

module.exports = mongoose.model('Sidekicks', SidekickSchema);