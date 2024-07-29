const redisClient = require('../redis');

const AvailabilityController = {
    getAvailableSlots: async (req, res) => {
        const cacheKey = 'available_slots';
        const lastFetchedTime = await redisClient.get('last_fetched_time');

        try {
            const cachedAvailability = await redisClient.get(cacheKey);
            if (cachedAvailability && (lastFetchedTime > Date.now() - 3600000)) { // Check if data is within an hour
                return res.json(JSON.parse(cachedAvailability));
            } else {
                // Fetch directly from third party database
                const availability = await fetchFromDatabase(); // whatever fetching logic is needed
                await redisClient.set(cacheKey, JSON.stringify(items), 'EX', 3600); // Cache for 1 hour
                await redisClient.set('last_fetched_time', Date.now());
                return res.json(availability);
            }
        } catch (error) {
            console.error('Error fetching available booking slots:', error);
            return res.status(500).send('Internal Server Error');
        }
    }
};

module.exports = AvailabilityController;
