const express = require('express');
const auth = require('../../middlewares/auth');
const biController = require('../../controllers/bi.controller');

const router = express.Router();

router.route('/').get(auth('admin'), biController.getData);

module.exports = router;
