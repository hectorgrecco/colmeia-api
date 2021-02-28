const mongoose = require('mongoose');
const uuid = require('node-uuid');
const { toJSON } = require('./plugins');

const hiveSchema = mongoose.Schema(
  {
    _id: { type: String, default: uuid.v4 },
    user: {
      type: String,
      ref: 'User',
      required: true,
    },
    logo_image: {
      type: String,
    },
    name: {
      type: String,
      required: true,
    },
    slug: {
      type: String,
      required: true,
      unique: true,
    },
    honeycombs: {
      type: Object,
      required: true,
    },
    colors: {
      type: Object,
      required: true,
    },
    bgImg: {
      type: String,
    },
  },
  {
    timestamps: true,
  }
);

// add plugin that converts mongoose to json
hiveSchema.plugin(toJSON);

/**
 * @typedef Hive
 */
const Hive = mongoose.model('Hive', hiveSchema);

module.exports = Hive;
