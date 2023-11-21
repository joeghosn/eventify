const express = require('express');
const router = express.Router();
const {favoriteEvent, unfavoriteEvent, getFavorites}= require('../controllers/favorites.controller')
const authorization = require('../middlewares/authorization');

router.route('/:id')
  .post(authorization(['user']), favoriteEvent)
  .delete(authorization(['user']), unfavoriteEvent);

router.route('/').get(authorization(['user']), getFavorites);

module.exports = router;
