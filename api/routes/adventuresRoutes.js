'use strict';

var express = require('express');
var router = express.Router();

var adventureController = require('../controllers/adventuresController');
var permit = require('../../config/permit');

// adventure Routes
router.route('/adventures')
  .get(permit("admin", "user"), adventureController.listAdventures)
  .post(permit("admin", "user"), adventureController.createAdventure);

router.route('/adventures/:adventureId')
  .get(permit("admin", "user"), adventureController.readAdventure)
  .put(permit("admin", "user"), adventureController.updateAdventure)
  .delete(permit("admin"), adventureController.deleteAdventure);

  router.route('/adventuresgeo')
  .get(permit("admin", "user"), adventureController.listAdventuresGeo);
 
  router.route('/adventuresgeosidekicksonly')
  .get(permit("admin", "user"), adventureController.listAdventuresGeoSidekicksOnly);

router.route('/adventuressidekicks')
  .get(permit("admin", "user"), adventureController.listAdventuresSidekicks);

  router.route('/adventuresfavorites')
  .post(permit("admin", "user"), adventureController.listAdventuresFavorites);

module.exports = router;