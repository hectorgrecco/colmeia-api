const catchAsync = require('../utils/catchAsync');
const { biService } = require('../services');

const getData = catchAsync(async (req, res) => {
  const data = await biService.getData();
  res.send(data);
});

module.exports = {
  getData,
};
