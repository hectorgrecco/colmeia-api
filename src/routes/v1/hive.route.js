const express = require('express');
const auth = require('../../middlewares/auth');
// const validate = require('../../middlewares/validate');
const hiveController = require('../../controllers/hive.controller');

const router = express.Router();

router.route('/').get(auth(), hiveController.getHives).post(auth(), hiveController.createHive);

router.route('/public/:hiveSlug').get(hiveController.getPublicHive);

router
  .route('/:hiveId')
  .get(auth(), hiveController.getHive)
  .put(auth(), hiveController.updateHive)
  .delete(auth(), hiveController.deleteHive);

module.exports = router;
