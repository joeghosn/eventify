const favoritesService= require('../services/favorites.service')

exports.favoriteEvent = async (req, res) => {
  try {
  const userId = req.user.userId;

  // Extract the event ID from the route parameters
  const eventId = req.params.id;

  const message = await favoritesService.favoriteEvent(userId, eventId);

  res.status(201).json({
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

exports.getFavorites = async (req, res) => {
  try {
    const {userId}= req.user;
    // Call the event service to get events
    const result = await favoritesService.getFavorites(userId);

    res.status(200).json(result);
  } catch (err) {
    const { status, message } = err;

    res.status(status || 500).json({
      status: 'fail',
      message: message || 'Internal Server Error',
    });
  }
};

exports.unfavoriteEvent = async (req, res) => {
  try {
    const userId = req.user.userId;

    // Extract the event ID from the route parameters
    const eventId = req.params.id;

    const message = await favoritesService.unfavoriteEvent(userId, eventId);

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