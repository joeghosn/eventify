const express = require('express');
const router = express.Router();
const { bookEvent, unbookEvent, getBookings } = require('../controllers/bookings.controller');
const authorization = require('../middlewares/authorization');


router.route('/:id')
  .post(authorization(['user']), bookEvent)
  .delete(authorization(['user']), unbookEvent);

router.route('/').get(authorization(['user']), getBookings);

module.exports = router;
