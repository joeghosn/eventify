const favoritesService= require('../services/favorites.service');
const catchAsync = require('../utils/catchAsync');

exports.favoriteEvent =catchAsync( async (req, res) => {

  const userId = req.user.userId;

  // Extract the event ID from the route parameters
  const eventId = req.params.id;

  const message = await favoritesService.favoriteEvent(userId, eventId);

  res.status(201).json({
    status: 'success',
    message,
  });


});

exports.getFavorites =catchAsync(async (req, res) => {
    const {userId}= req.user;
    // Call the event service to get events
    const result = await favoritesService.getFavorites(userId);

    res.status(200).json(result);
}) ;

exports.unfavoriteEvent = catchAsync( async (req, res) => {
    const userId = req.user.userId;

    // Extract the event ID from the route parameters
    const eventId = req.params.id;

    const message = await favoritesService.unfavoriteEvent(userId, eventId);

    res.status(200).json({
      status: 'success',
      message,
    });

 
});