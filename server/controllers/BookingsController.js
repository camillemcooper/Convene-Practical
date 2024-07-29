const redisClient = require('../redis');

const database = {} // need to add logic that allows us to connect Redis to the database

const BookingsController = {
    // This call is so the user can get access to the bookings they have made themselves already
    getUserBookings: async (req, res) => {
        const userId = req.user.id; // Get user ID from the request
        const cacheKey = `user_bookings:${userId}`;
        try {
            const cachedBookings = await redisClient.get(cacheKey);

            if (cachedBookings) {
                return res.json(JSON.parse(cachedBookings));
            } else {
                const bookings = await database.getUserBookings(userId);
                await redisClient.set(cacheKey, JSON.stringify(bookings));
                return res.json(bookings);
            }
        } catch (error) {
            console.error('Error fetching user bookings:', error);
            return res.status(500).send('Internal Server Error');
        }
    },

    // this call is where new bookings are executed. refer to other submission to understand more about how I suggest that happens 
    createBooking: async (req, res) => {
        const bookingData = req.body;
        try {
            await database.createBooking(bookingData);
            const userId = bookingData.userId;
            const cacheKey = `user_bookings:${userId}`;
            await redisClient.del(cacheKey); // Invalidate cache for user bookings
            return res.status(201).send('Booking request created');
        } catch (error) {
            console.error('Error requesting booking:', error);
            return res.status(500).send('Internal Server Error');
        }
    }
};

module.exports = BookingsController;
