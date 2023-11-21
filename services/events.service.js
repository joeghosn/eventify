const Event = require('../database/models/events.model');


const eventService = {
  createEvent: async ({body, user}) => {
    try {
     
      // Create a new event
      const newEvent = await Event.create({
        ...body,
        userId: user.userId,
      });

      return {
        status: 'success',
        event: newEvent,
      };
    } catch (err) {
      console.error(err);
      throw {
        status: 500,
        message: 'Internal Server Error',
      };
    }
  },

  getEvents: async ({ user, query }) => {
    try {
      const { userId, userRole } = user;
  
      // Define allowed operators
      const allowedOperators = ['eq', 'ne', 'gte', 'gt', 'lte', 'lt', 'like'];
  
      // Initialize where clause
      let whereClause = {};
  
      // Build where clause based on query parameters
      Object.entries(query).forEach(([key, value]) => {
        // Check if the key has a valid operator suffix (e.g., "price__gte")
        const [field, operator] = key.split('__');
        if (allowedOperators.includes(operator)) {
          // Use the specified operator
          whereClause[field] = {
            [Op[operator]]: value,
          };
        } else {
          // Use the default equality operator
          whereClause[field] = value;
        }
      });
  
      // Add userId condition for planner role
      if (userRole === 'planner') {
        whereClause.userId = userId;
      }
  
      // Retrieve events from the database based on the where clause
      const events = await Event.findAll({
        where: whereClause,
      });
  
      return {
        status: 'success',
        data: {
          total: events.length,
          events,
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
  

  getEvent: async (eventId) => {
    try {
      // Retrieve an event by ID from the database
      const event = await Event.findByPk(eventId);

      // Check if the event was found
      if (!event) {
        throw {
          status: 404,
          message: 'Event not found',
        };
      }

      return {
        status: 'success',
        event,
      };
    } catch (err) {
      console.error(err);
      throw {
        status: 500,
        message: 'Internal Server Error',
      };
    }
  },

  deleteEvent: async (eventId) => {
    try {
      // Find the event to check if it exists before attempting to delete
      const event = await Event.findByPk(eventId);

      // Check if the event exists
      if (!event) {
        throw {
          status: 404,
          message: 'Event not found',
        };
      }

      // Delete the event
      await Event.destroy({
        where: {
          eventId,
        },
      });

      return {
        status: 'success',
        data: null,
      };
    } catch (err) {
      console.error(err);
      throw {
        status: 500,
        message: 'Internal Server Error',
      };
    }
  },

  updateEvent: async (eventId, eventData) => {
    try {

      // Find the event to check if it exists before attempting to update
      const event = await Event.findByPk(eventId);
      
      // Check if the event exists
      if (!event) {
        throw {
          status: 404,
          message: 'Event not found',
        };
      }

      // Update event and return the updated version
      const updatedEvent = await event.update(eventData, {
        returning: true,
      });

      return {
        status: 'success',
        event: updatedEvent,
      };
    } catch (err) {
      console.error(err);
      throw {
        status: 500,
        message: 'Internal Server Error',
      };
    }
  },

  updateEventStatus: async (eventId, newStatus) => {
    try {
      // Find the event to check if it exists before attempting to update status
      const event = await Event.findByPk(eventId);

      // Check if the event exists
      if (!event) {
        throw {
          status: 404,
          message: 'Event not found',
        };
      }

      // Check if the event is in the "pending" status
      if (event.status !== 'pending') {
        throw {
          status: 400,
          message: `Cannot accept or reject event with ${event.status} status`,
        };
      }

      // Update the event status
      const updatedEvent = await event.update({ status: newStatus }, { returning: true });

      return {
        status: 'success',
        event: updatedEvent,
      };
    } catch (err) {
      console.error(err);
      throw {
        status: err.status || 500,
        message: err.message || 'Internal Server Error',
      };
    }
  },
};

module.exports=eventService;
