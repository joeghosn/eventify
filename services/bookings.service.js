const Event= require('../database/models/events.model');
const Bookings= require('../database/models/bookings.model');


const bookingService={
    bookEvent: async(userId, eventId) =>{
        // Find the event to check if it exists before attempting to book
        const event = await Event.findByPk(eventId);
      
        // Check if the event exists
        if (!event) {
          throw new Error('Event not found');
        }
      
        // Check if the event is already booked by the user
        const isAlreadyBooked = await Bookings.findOne({
          where: {
            userId,
            eventId,
          },
        });
      
        if (isAlreadyBooked) {
          throw new Error('Event is already booked by the user');
        }
      
        // Book the event
        await Bookings.create({
          userId,
          eventId,
          dateBooked: new Date(),
        });

        await event.update({ isBooked: true });
      
        return  {
          status: 'success',
          message: 'Event booked successfully',
        };

      },

      getBookings: async (userId) => {
        try {
          // Retrieve all events from the database
          const bookings = await Bookings.findAll({
            where: {
              userId,
            },
            include: [
              {
                model: Event, // Include the Event model
                as: 'event', // Alias for the association
                attributes: ['eventId', 'name', 'description', 'city', 'street', 'building', 'seats', 'minimumAge', 'dressCode', 'price', 'status', 'userId'], // Select the attributes you need
              },
            ],
          });
    
          return {
            status: 'success',
            data: {
              total: bookings.length,
              bookings,
            },
          };
        } catch (err) {
          console.error(err);
          throw {
            status: 500,
            message: 'Internal Server Error',
          };
        }
      },

    unbookEvent: async(userId, eventId)=> {
        // Find the event to check if it exists before attempting to cancel booking
        const event = await Event.findByPk(eventId);
      
        // Check if the event exists
        if (!event) {
          throw new Error('Event not found');
        }
      
        // Check if the event is booked by the user
        const isBooked = await Bookings.findOne({
          where: {
            userId,
            eventId,
          },
        });
      
        if (!isBooked) {
          throw new Error('Event is not booked by the user');
        }
      
        // Cancel the booking
        await Bookings.destroy({
          where: {
            userId,
            eventId,
          },
        });

        await event.update({ isBooked: false });
      
        return {
          status: 'success',
          message: 'Event unbooked successfully',
        };
      }
      
}

module.exports= bookingService;