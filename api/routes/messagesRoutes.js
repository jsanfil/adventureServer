'use strict';

var express = require('express');
var router = express.Router();

var messageController = require('../controllers/messagesController');
var permit = require('../../config/permit');

// message Routes
router.route('/messages')
  .get(permit("admin"), messageController.listMessages)
  .post(permit("admin", "user"), messageController.createMessage);

router.route('/messages/:messageId')
  .get(permit("admin"), messageController.readMessage)
  .put(permit("admin"), messageController.updateMessage)
  .delete(permit("admin"), messageController.deleteMessage);

module.exports = router;
