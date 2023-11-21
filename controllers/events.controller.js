const {validationResult}= require('express-validator')
const eventService= require('../services/events.service');
const {createEventSchema, updateEventSchema}= require('../schemas/events');

exports.createEvent = async (req, res) => {
  try {
 
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
    const result = await eventService.createEvent(req);
    res.status(201).json(result);

  } catch (err) {
    res.status(500).json({
      message:'Internal Server Error',
      errors: err,
    });
  }
};


exports.getEvents = async (req, res) => {
  try {
    // Call the event service to get events
    const result = await eventService.getEvents(req);
  

    res.status(200).json(result);
  } catch (err) {
    const { status, message } = err;

    res.status(status || 500).json({
      status: 'fail',
      message: message || 'Internal Server Error',
    });
  }
};

exports.getEvent = async (req, res) => {
  try {
    const eventId = req.params.id;

    // Call the event service to get a specific event
    const result = await eventService.getEvent(eventId);

    res.status(200).json(result);
  } catch (err) {
    const { status, message } = err;

    res.status(status || 500).json({
      status: 'fail',
      message: message || 'Internal Server Error',
    });
  }
};

exports.deleteEvent = async (req, res) => {
  try {
    const eventId = req.params.id;

    // Call the event service to delete an event
    const result = await eventService.deleteEvent(eventId);

    res.status(204).json(result);
  } catch (err) {
    const { status, message } = err;

    res.status(status || 500).json({
      status: 'fail',
      message: message || 'Internal Server Error',
    });
  }
};

exports.updateEvent = async (req, res) => {
  try {
 
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
  } catch (err) {
    const { status, message } = err;

    res.status(status || 500).json({
      status: 'fail',
      message: message || 'Internal Server Error',
    });
  }
};

exports.updateEventStatus = async (req, res) => {
  try {
    const eventId = req.params.id;
    const newStatus = req.body.status; // Assuming the new status is provided in the request body

    // Call the event service to update the event status
    const result = await eventService.updateEventStatus(eventId, newStatus);

    res.status(200).json(result);
  } catch (err) {
    const { status, message } = err;

    res.status(status || 500).json({
      status: 'fail',
      message: message || 'Internal Server Error',
    });
  }
};


