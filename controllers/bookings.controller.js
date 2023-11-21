const bookingsService= require('../services/bookings.service')

exports.bookEvent = async (req, res) => {
    try {
        //The user Id comes from the attached user object to the req after applying checkIfAuthorized middleware
        const userId = req.user.userId;
  
        // Extract the event ID from the route parameters
        const eventId = req.params.id;

        const result = await bookingsService.bookEvent(userId, eventId);
  
        res.status(201).json({
          status: 'success',
          booking: result
        });
  
    } catch (err) {
      console.error(err);
      res.status(500).json({
        status: 'error',
        message: 'Internal Server Error',
      });
    }
  };

  exports.getBookings = async (req, res) => {
    try {
      const {userId}= req.user;
      // Call the event service to get events
      const result = await bookingsService.getBookings(userId);
  
      res.status(200).json(result);
    } catch (err) {
      const { status, message } = err;
  
      res.status(status || 500).json({
        status: 'fail',
        message: message || 'Internal Server Error',
      });
    }
  };
  
  
  exports.unbookEvent = async (req, res) => {
    try {
 // Extract the event ID from the route parameters
 const eventId = req.params.id;
    
             //The user Id comes from the attached user object to the req after applying checkIfAuthorized middleware
        const userId = req.user.userId;

        const message = await bookingsService.unbookEvent(userId, eventId);
  
        res.status(200).json({
          status: 'success',
          message,
        });

    } catch (err) {
      console.error(err);
      res.status(500).json({
        status: 'error',
        message: 'Internal Server Error',
      });
    }
  };