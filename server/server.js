const express = require('express');
const routes = require('./routes/routes');
const redisClient = require('./services/redis');

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(express.json())

// Needs logic to connect to the third party database

// Use routes
app.use(routes);

// Start the server
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
    redisClient.on('error', (err) => {
        console.error('Redis error:', err);
    });
});
