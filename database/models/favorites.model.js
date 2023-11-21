// Favorites Model
const sequelize = require('../database.js');
const User = require('./users.model.js');
const Event=require('./events.model.js');

const Favorites = sequelize.define(
  'favorites',
  {
 
  },
  {
    tableName: 'favorites', // Explicitly set the table name
  }
);

// Define associations
Favorites.belongsTo(User, { foreignKey: 'userId', onDelete: 'CASCADE' });
Favorites.belongsTo(Event, { foreignKey: 'eventId', onDelete: 'CASCADE' });

User.belongsToMany(Event, { through: 'favorites', foreignKey: 'userId' });
Event.belongsToMany(User, { through: 'favorites', foreignKey: 'eventId' });

module.exports = Favorites;

