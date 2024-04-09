const express = require('express');

const { applyForBidController } = require('../controller/userControllers');

const router = express.Router();

router.post('/applyForBid', applyForBidController);

module.exports = router;