const express = require('express');
const router = express.Router();
const {createEvent, getEvents, getEvent, updateEvent, deleteEvent, updateEventStatus} = require('../controllers/events.controller');
const authorization= require('../middlewares/authorization')

router.route('/').post(authorization(['planner']),createEvent).get(authorization(['admin','user','planner']),getEvents)
router.route('/:id').patch(authorization(['planner']),updateEvent).delete(authorization(['planner']), deleteEvent).get(authorization(['admin','user','planner']), getEvent)
router.route('/:id/status').patch(authorization(['admin']),updateEventStatus)
module.exports = router;
