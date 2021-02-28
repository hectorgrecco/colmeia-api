const { hiveService } = require('./index');

const checkSlug = async (slug) => {
  const existingSlug = await hiveService.getHiveBySlug(slug);
  return !!existingSlug;
};

module.exports = {
  checkSlug,
};
