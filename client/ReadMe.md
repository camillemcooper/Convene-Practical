# client folder

This is empty besides this readme as I chose to spend my time elaborating on the Redis logic which is more critical and complicated. The point of this folder is to show the separation of the React frontend and the Redis and Express Backend and to talk a little here about what the React part of the app would need to do

## What the frontend would need to do

The frontend is always gonna hit Redis for information. If the logic in the redis controllers determines that the database can be directly pulled from then Redis will handle that. the logic will be in the redis logic for that. the frontend isn't actually going to really be able to tell how fresh the data is unless we add a variable that lets the user know that. could be an interesting additional feature. but basically the frontend never directly pulls from the database and it doesn't really care that it doesn't

**to create bookings it does actually write straight to the database**

## What the calls look like

These would be super simple. Like I said, the frontend really is just pulling from Redis. I'd use axios. you could get away with implementation with the build in fetch. It'd look something like

**Populating the calendar**

```
export const getAvailability = async () => {
    const response = await axios.get(`${BASE_URL}/availability`);
    return response.data;
};
```

**requesting reservation**

```
export const requestReservation = async (reservationData) => {
    const response = await axios.post(`${BASE_URL}/reservations`, reservationData);
    return response.data;
};
```

There would be other calls to like the one to get the specific user reservations that already exists.
