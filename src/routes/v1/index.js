const express = require('express');
const authRoute = require('./auth.route');
const userRoute = require('./user.route');
const hiveRoute = require('./hive.route');
const biRoute = require('./bi.route');
const slugRoute = require('./slug.route');
const docsRoute = require('./docs.route');
const config = require('../../config/config');

const router = express.Router();

const defaultRoutes = [
  {
    path: '/auth',
    route: authRoute,
  },
  {
    path: '/users',
    route: userRoute,
  },
  {
    path: '/hives',
    route: hiveRoute,
  },
  {
    path: '/bi',
    route: biRoute,
  },
  {
    path: '/slug',
    route: slugRoute,
  },
];

const devRoutes = [
  // routes available only in development mode
  {
    path: '/docs',
    route: docsRoute,
  },
];

defaultRoutes.forEach((route) => {
  router.use(route.path, route.route);
});

/* istanbul ignore next */
if (config.env === 'development') {
  devRoutes.forEach((route) => {
    router.use(route.path, route.route);
  });
}

module.exports = router;
