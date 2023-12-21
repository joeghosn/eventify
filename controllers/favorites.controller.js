const favoritesService= require('../services/favorites.service');
const catchAsync = require('../utils/catchAsync');

exports.favoriteEvent =catchAsync( async (req, res) => {

  const userId = req.user.userId;

  // Extract the event ID from the route parameters
  const eventId = req.params.id;

  await favoritesService.favoriteEvent(userId, eventId);
  res.status(200).json({
    status: 'success',
    message: 'Event favorited successfully',
});
});

exports.getFavorites =catchAsync(async (req, res) => {
    const {userId}= req.user;
    // Call the event service to get events
    const result = await favoritesService.getFavorites(userId);
    res.render('../views/pages/favorites', {events: result.data.favorites, user: req.user})

}) ;

exports.unfavoriteEvent = catchAsync( async (req, res) => {
    const userId = req.user.userId;

    // Extract the event ID from the route parameters
    const eventId = req.params.id;

    const result= await favoritesService.unfavoriteEvent(userId, eventId);
    res.status(200).json(result);
});