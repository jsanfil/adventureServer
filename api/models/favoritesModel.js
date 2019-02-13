'use strict';
var mongoose = require('mongoose');
var Schema = mongoose.Schema;


var FavoriteSchema = new Schema({
  username: {
    type: String,
    required: 'Please enter the name of the Favorite'
  },
  adventureID: Schema.Types.ObjectId,
},
  {timestamps: true}
);

module.exports = mongoose.model('Favorites', FavoriteSchema);