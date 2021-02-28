const httpStatus = require('http-status');
const catchAsync = require('../utils/catchAsync');
const ApiError = require('../utils/ApiError');
const { hiveService } = require('../services');

const getHives = catchAsync(async (req, res) => {
  const hives = await hiveService.getHivesByUser(req.user._id);
  res.send(hives);
});

const getPublicHive = catchAsync(async (req, res) => {
  const hive = await hiveService.getHiveBySlug(req.params.hiveSlug);
  if (!hive) throw new ApiError(httpStatus.NOT_FOUND, 'HIVE_NOT_FOUND');
  res.send(hive);
});

const getHive = catchAsync(async (req, res) => {
  const hive = await hiveService.getHiveById(req.params.hiveId, req.user._id);
  if (!hive) throw new ApiError(httpStatus.NOT_FOUND, 'HIVE_NOT_FOUND');
  res.send(hive);
});

const createHive = catchAsync(async (req, res) => {
  const hive = await hiveService.createHive(req.body, req.user);
  res.status(httpStatus.CREATED).send(hive);
});

const updateHive = catchAsync(async (req, res) => {
  const hive = await hiveService.updateHive(req.params.hiveId, req.body, req.user);
  res.status(httpStatus.OK).send(hive);
});

const deleteHive = catchAsync(async (req, res) => {
  await hiveService.deleteHive(req.params.hiveId, req.user);
  res.status(httpStatus.NO_CONTENT).send();
});

module.exports = {
  getHives,
  getHive,
  getPublicHive,
  createHive,
  updateHive,
  deleteHive,
};
