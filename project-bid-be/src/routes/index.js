const express = require('express');

const authRoutes = require('./authRoutes');
const adminRoutes = require('./adminRoutes');
const userRoutes = require('./userRoutes');

const router = express.Router();

const routerArray = [authRoutes, adminRoutes, userRoutes];

routerArray.forEach((_router) => {
  router.use(_router);
});

module.exports = routerArray;