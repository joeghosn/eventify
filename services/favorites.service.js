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
      
        return 'Event favorited successfully';
      },

      getFavorites: async (userId) => {
        try {
          // Retrieve all events from the database
          const favorites = await Favorites.findAll({
            where:{
              userId
            }
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
      
        return 'Event unfavorited successfully';
      } 
}

module.exports=favoritesService;