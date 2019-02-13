
'use strict';
var mongoose = require('mongoose');
var Schema = mongoose.Schema;


var ProfileSchema = new Schema({
  username: {
    type: String,
    required: 'Please enter the name of the Profile'
  },
  city: String,
  state: String,
  email: String,
  fullName: String,
  profileImage: String,
  backgroundImage: String,
  },
  {timestamps: true}
);

module.exports = mongoose.model('Profiles', ProfileSchema);