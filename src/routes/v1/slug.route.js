const express = require('express');
const auth = require('../../middlewares/auth');
const slugController = require('../../controllers/slug.controller');

const router = express.Router();

router.route('/:slug/check').get(auth(), slugController.checkSlug);

module.exports = router;
