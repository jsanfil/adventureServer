
var express = require('express'),
  app = express(),
  mongoose = require('mongoose'),
  bodyParser = require('body-parser'),
  passport = require('./config/auth.js'),
  appRoot = require('app-root-path'),
  morgan = require('morgan'),
  winston = require('./config/winston.js');
require('dotenv').config({ path: appRoot+'/.env' });

// Load the model objects
var Adventure = require('./api/models/adventuresModel'), 
Profile = require('./api/models/profilesModel'),
Sidekick = require('./api/models/sidekicksModel'),
Favorite = require('./api/models/favoritesModel'),
Message = require('./api/models/messagesModel');
  
// mongoose instance connection url connection
mongoose.Promise = global.Promise;
mongoose.connect(process.env.MONGO_CONNECT); 

// Log all requests
app.use(morgan('combined', { stream: winston.stream }));

//Initialize authentication
app.use(passport.initialize());

// Configure body parsers
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// Setup the routes
var adventureRoutes = require('./api/routes/adventuresRoutes'); 
var imageRoutes = require('./api/routes/imagesRoutes'); 
var profileRoutes = require('./api/routes/profilesRoutes');
var sidekickRoutes = require('./api/routes/sidekicksRoutes');
var favoriteRoutes = require('./api/routes/favoritesRoutes');
var messageRoutes = require('./api/routes/messagesRoutes');
app.use('/api', passport.authenticate('jwt', { session: false }), adventureRoutes, 
  imageRoutes, profileRoutes, sidekickRoutes, favoriteRoutes, messageRoutes);

// Catch all for any non-defined routes
app.use(function(req, res) {
    res.status(404).send({url: req.originalUrl + ' not found'})
  });

// Start the server
var port = process.env.PORT || 3000;
app.listen(port);

console.log('Adventures RESTful API server started on: ' + port);
