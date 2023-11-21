// Event Model
const Sequelize = require('sequelize');
const sequelize = require('../database');

const { DataTypes } = Sequelize;

const User = require('./users.model.js');

const Event = sequelize.define(
  'events',
  {
    eventId: {
      type: DataTypes.UUID,
      defaultValue: Sequelize.UUIDV4,
      primaryKey: true,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        len: [1, 40],
      },
    },
    description: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        len: [1, 255],
      },
    },
    city: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        len: [1, 40],
      },
    },
    street: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        len: [1, 40],
      },
    },
    building: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        len: [1, 40],
      },
    },
    seats: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
    minimumAge: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 18,
      validate: {
        min: 18,
      },
    },
    dressCode: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    price: {
      type: DataTypes.FLOAT,
      allowNull: false,
      validate: {
        min: 0,
      },
    },
    status: {
      type: DataTypes.ENUM('pending', 'approved', 'rejected', 'canceled'),
      defaultValue: 'pending',
      allowNull: false,
    },
    userId: {
      type: DataTypes.UUID,
      allowNull: false,
    },
  },
  {tableName: 'events'}
);

// Define association with the User model
Event.belongsTo(User, { foreignKey: 'userId', as: 'host' });

module.exports = Event;

