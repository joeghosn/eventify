const express = require('express');
const morgan = require('morgan');
const sequelize = require('./database/database');
const authRoutes = require('./routes/auth.routes');
const eventsRoutes= require('./routes/events.routes');
const bookingsRoutes= require('./routes/bookings.routes')
const favoritesRoutes= require('./routes/favorites.routes')
const baseUrl= require('./constants/index')

const app = express();

app.use(morgan('dev'));
app.use(express.json());

// Wrap the Sequelize sync operation in an IIFE
(async () => {
  try {
    await sequelize.sync();
    console.log('Database synchronized');
  } catch (err) {
    console.error('Error synchronizing database:', err);
  }
})();

app.use(`${baseUrl}/auth`, authRoutes);
app.use(`${baseUrl}/events`, eventsRoutes)
app.use(`${baseUrl}/bookings`, bookingsRoutes);
app.use(`${baseUrl}/favorites`, favoritesRoutes);
//Very important to be place here!
app.all('*',(req, res)=>{
    const err= new Error(`Can't find ${req.originalUrl} on this server`)
    err.status='fail';
    err.statusCode='404'
})
app.use((err, req, res, next)=>{
    err.statusCode= err.statusCode || 500;
    err.status= err.status || 'error';
    res.status(err.statusCode).json({
        status: error.status,
        message: err.message,
    });
})

const port = 3000;
app.listen(port, () => {
  console.log(`Server is running on port ${port}...`);
});


module.exports = app;
