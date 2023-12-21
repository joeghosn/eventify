const {validationResult}= require('express-validator')
const eventService= require('../services/events.service');
const {createEventSchema, updateEventSchema}= require('../schemas/events');
const catchAsync = require('../utils/catchAsync');

exports.createEvent = catchAsync( async (req, res) => {
        // Validate event data using express-validator
        await Promise.all(createEventSchema.map(validationRule => validationRule.run(req)));
        const errors = validationResult(req);

        if (!errors.isEmpty()) {
          res.status(400).json({
            message: 'Validation failed',
            errors: errors.array(),
          })
        }

    // Call the event service to create an event
    await eventService.createEvent(req);
    res.redirect('/api/v1/events');
});


exports.getEvents = catchAsync(async (req, res) => {
    // Call the event service to get events
    const result=await eventService.getEvents(req);
    res.render('../views/pages/events',{events: result.data.events, user: req.user});
});

exports.getEvent = catchAsync( async (req, res) => {

    const eventId = req.params.id;

    // Call the event service to get a specific event
    const result = await eventService.getEvent(eventId);
    console.log(result.event)
    res.render('../views/pages/event',{event: result.event, user: req.user})

});

exports.deleteEvent = catchAsync( async (req, res) => {

    const eventId = req.params.id;

    // Call the event service to delete an event
   await eventService.deleteEvent(eventId);
   res.redirect('/api/v1/events');
});

exports.updateEvent =catchAsync( async (req, res) => {
    const eventId = req.params.id;
    // Validate event data using express-validator
    await Promise.all(updateEventSchema.map(validationRule => validationRule.run(req)));
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      res.status(400).json({
        message: 'Validation failed',
        errors: errors.array(),
      })
    }
    
    // Call the event service to update an event
    const result = await eventService.updateEvent(eventId, req.body);

    res.status(200).json(result);
});

exports.updateEventStatus = catchAsync(async (req, res) => {
    const eventId = req.params.id;
    const newStatus = req.body.status; // Assuming the new status is provided in the request body

    // Call the event service to update the event status
   await eventService.updateEventStatus(eventId, newStatus);
   res.redirect(`/api/v1/events/${eventId}`)

});


