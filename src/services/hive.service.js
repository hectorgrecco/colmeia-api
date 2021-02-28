const httpStatus = require('http-status');
const { Hive } = require('../models');
const ApiError = require('../utils/ApiError');

const getHivesByUser = async (id) => {
  return Hive.find({ user: id });
};

const getHiveBySlug = async (slug) => {
  return Hive.findOne({ slug });
};

const getHiveById = async (id, user) => {
  const hive = await Hive.findOne({ _id: id, user });
  if (!hive) throw new ApiError(httpStatus.NOT_FOUND, 'HIVE_NOT_FOUND');
  return hive;
};

const createHive = async (params, user) => {
  const newHive = {
    name: params.name,
    user: user._id,
    slug: params.slug,
    honeycombs: params.honeycombs,
    colors: params.colors,
  };

  const slug = await getHiveBySlug(newHive.slug);
  if (slug) throw new ApiError(httpStatus.BAD_REQUEST, 'SLUG_ALREADY_TAKEN');

  const hive = await Hive.create(newHive);
  return hive;
};

const updateHive = async (id, params, user) => {
  const userId = user._id;
  const hive = await getHiveById(id, userId);
  if (!hive) throw new ApiError(httpStatus.NOT_FOUND, 'HIVE_NOT_FOUND');

  if (params.slug !== hive.slug) {
    const hiveSlug = await getHiveBySlug(params.slug);
    if (hiveSlug) throw new ApiError(httpStatus.BAD_GATEWAY, 'SLUG_ALREADY_TAKEN');
  }

  if (params.slug === hive.slug && hive.id !== id) throw new ApiError(httpStatus.BAD_GATEWAY, 'SLUG_ALREADY_TAKEN');

  hive.honeycombs = params.honeycombs ? params.honeycombs : hive.honeycombs;
  hive.logo_image = params.logo_image ? params.logo_image : hive.logo_image;
  hive.slug = params.slug ? params.slug : hive.slug;
  hive.name = params.name ? params.name : hive.name;
  hive.colors = params.colors ? params.colors : hive.colors;
  hive.bgImg = !params.colors.bg ? params.bgImg : null;

  await hive.save();
  return hive;
};

const deleteHive = async (id, user) => {
  const hive = await getHiveById(id, user._id);
  if (!hive) throw new ApiError(httpStatus.NOT_FOUND, 'HIVE_NOT_FOUND');
  await hive.remove();
  return true;
};

module.exports = {
  getHivesByUser,
  getHiveBySlug,
  getHiveById,
  createHive,
  updateHive,
  deleteHive,
};
