const express = require('express');
const router = express.Router();

// example controllers
const BookingsController = require('./controllers/BookingsController');
const ItemsController = require('./controllers/ItemsController');
const RefreshController = require('./controllers/RefreshController');

// Middleware for authentication
const authMiddleware = (req, res, next) => {
/* This is totally barebones mocked. I don't think you expect me
 to write this. this is mostly to acknowledge there's some parts
I'm black boxing rn */

// authentication logic
};

// Routes
// Route to get all user bookings
router.get('/api/bookings', authMiddleware, BookingsController.getUserBookings);

// Route to create a new booking
router.post('/api/bookings', authMiddleware, BookingsController.createBooking);

// Route to fetch available items
router.get('/api/items', authMiddleware, ItemsController.getAvailableItems);

// Route to check the status of the last fetch
router.get('/api/status', authMiddleware, RefreshController.getStatus);

module.exports = router;