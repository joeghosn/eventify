const Event = require('../database/models/events.model')
const Favorites = require("../database/models/favorites.model");

const favoritesService={
    favoriteEvent: async (userId, eventId)=> {
        // Find the event to check if it exists before attempting to favorite
        const event = await Event.findByPk(eventId);
      
        // Check if the event exists
        if (!event) {
          throw new Error('Event not found');
        }
      
        // Check if the event is already favorited by the user
        const isAlreadyFavorited = await Favorites.findOne({
          where: {
            userId,
            eventId,
          },
        });
      
        if (isAlreadyFavorited) {
          throw new Error('Event is already favorited by the user');
        }
      
        // Favorite the event
        await Favorites.create({
          userId,
          eventId,
        });

        await event.update({ isFavorited: true });
      
        return  {
          status: 'success',
          message: 'Event favorited successfully',
        };
      },

      getFavorites : async (userId) => {
        try {
          // Retrieve all favorites and include associated events
          const favorites = await Favorites.findAll({
            where: {
              userId
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
              total: favorites.length,
              favorites,
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
      
      unfavoriteEvent: async(userId, eventId) =>{
        // Find the event to check if it exists before attempting to unfavorite
        const event = await Event.findByPk(eventId);
      
        // Check if the event exists
        if (!event) {
          throw new Error('Event not found');
        }
      
        // Check if the event is favorited by the user
        const isFavorited = await Favorites.findOne({
          where: {
            userId,
            eventId,
          },
        });
      
        if (!isFavorited) {
          throw new Error('Event is not favorited by the user');
        }
      
        // Unfavorite the event
        await Favorites.destroy({
          where: {
            userId,
            eventId,
          },
        });

        await event.update({ isFavorited: false });
      
        return {
          status: 'success',
          message: 'Event unfavorited successfully',
        }
      } 
}

module.exports=favoritesService;