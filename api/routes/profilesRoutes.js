'use strict';

var express = require('express');
var router = express.Router();

var profileController = require('../controllers/profilesController');
var passport = require('passport');

// profile Routes
router.route('/profiles')
  .get(profileController.listProfiles)
  .post(profileController.createProfile);

router.route('/profiles/:profileId')
  .get(profileController.readProfile)
  .put(profileController.updateProfile)
  .delete(profileController.deleteProfile);

  module.exports = router;
