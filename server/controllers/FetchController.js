const redisClient = require('../redis');

const FetchController = {
    getStatus: async (req, res) => {
        const lastFetchedTime = await redisClient.get('last_fetched_time');
        return res.json({ lastFetchedTime: new Date(parseInt(lastFetchedTime)) });
    }
};

module.exports = FetchController;
