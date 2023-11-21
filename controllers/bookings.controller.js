const bookingsService= require('../services/bookings.service');

const catchAsync = require('../utils/catchAsync');

exports.bookEvent = catchAsync( async (req, res) => {
        //The user Id comes from the attached user object to the req after applying checkIfAuthorized middleware
        const userId = req.user.userId;
  
        // Extract the event ID from the route parameters
        const eventId = req.params.id;

        const result = await bookingsService.bookEvent(userId, eventId);
  
        res.status(201).json({
          status: 'success',
          booking: result
        });
  });

  exports.getBookings = catchAsync(async (req, res) => {
 
      const {userId}= req.user;
      // Call the event service to get events
      const result = await bookingsService.getBookings(userId);
  
      res.status(200).json(result);
    
  });
  
  
  exports.unbookEvent = catchAsync(async (req, res) => {
 // Extract the event ID from the route parameters
 const eventId = req.params.id;
    
             //The user Id comes from the attached user object to the req after applying checkIfAuthorized middleware
        const userId = req.user.userId;

        const message = await bookingsService.unbookEvent(userId, eventId);
  
        res.status(200).json({
          status: 'success',
          message,
        });
  });