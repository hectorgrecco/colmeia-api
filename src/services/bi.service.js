const { Hive, User } = require('../models');

const getData = async () => {
  return {
    hives: await Hive.countDocuments(),
    users: await User.countDocuments(),
  };
};

module.exports = {
  getData,
};
