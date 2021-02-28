const httpStatus = require('http-status');
const catchAsync = require('../utils/catchAsync');
const { slugService } = require('../services');

const checkSlug = catchAsync(async (req, res) => {
  const exists = await slugService.checkSlug(req.params.slug);
  res.status(httpStatus.OK).send({ exists });
});

module.exports = {
  checkSlug,
};
