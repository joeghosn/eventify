// Bookings Model
const {DataTypes} = require('sequelize');
const sequelize = require('../database.js');

const User = require('./users.model.js');
const Event = require('./events.model.js');

const Bookings = sequelize.define(
  'bookings',
  {
    dateBooked: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: DataTypes.NOW,
    },
  },
  {
    tableName: 'bookings', // Explicitly set the table name
  }
);

// Define associations
Bookings.belongsTo(User, { foreignKey: 'userId', onDelete: 'CASCADE' });
Bookings.belongsTo(Event, { foreignKey: 'eventId', onDelete: 'CASCADE' });

User.belongsToMany(Event, { through: 'bookings', foreignKey: 'userId' });
Event.belongsToMany(User, { through: 'bookings', foreignKey: 'eventId' });

module.exports = Bookings;

