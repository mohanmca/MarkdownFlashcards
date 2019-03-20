/* eslint-disable prefer-destructuring */

const express = require('express');
const searchService = require('../services/searchService')
const searchController = require('../controllers/searchController.js')

function router(nav) {
  const searchRouter = express.Router();
  const { getIndex, getById, middleware } = searchController(searchService, nav);

  searchRouter.use(middleware);
  searchRouter.route('/').get(getIndex);


  return searchRouter;
}

module.exports = router;
