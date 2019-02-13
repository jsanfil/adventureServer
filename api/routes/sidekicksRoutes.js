'use strict';

var express = require('express');
var router = express.Router();

var sidekickController = require('../controllers/sidekicksController');
var passport = require('passport');

// sidekick Routes
router.route('/sidekicks')
  .get(sidekickController.listSidekicks)
  .post(sidekickController.createSidekick);

router.route('/sidekicks/:sidekickId')
  .get(sidekickController.readSidekick)
  .put(sidekickController.updateSidekick)
  .delete(sidekickController.deleteSidekick);

  module.exports = router;
