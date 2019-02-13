
'use strict';
var mongoose = require('mongoose');
var Schema = mongoose.Schema;


var AdventureSchema = new Schema({
  name: {
    type: String,
    required: 'Please enter the name of the Adventure'
  },
  desc: String,
  author: String,
  access: { 
    type: String,
    default: 'private'
  },
  defaultImage: String,
  category: String,
  images: [String],
  location: {
    type: {
      type: String, // Don't do `{ location: { type: String } }`
      enum: ['Point'], // 'location.type' must be 'Point'
      required: true
    },
    coordinates: {
      type: [Number],
      required: true
    }
  },
  rating: Number,
  ratingCount: Number,
  acl: [String]
  },
  {timestamps: true}
);

module.exports = mongoose.model('Adventures', AdventureSchema);