# Convene Practical Assessment

This is the proof of concept code for the Convene practical assessment as completed by Camille Cooper.

## Goal

Show how one might tackle a situation in which the third party controlled database is limited to a single pull request per hour but the booking application needs up to date information for multiple users who are likely making multiple asychronous calls throughout all the hours

## Solution

### Overall Architecture

The main two things needed for this system to work are the following:

#### Client-Side Caching

Client-side caching allows a single user session to store fetched data. While this session is active, there are no need to hit the source for data for every request. There are a couple ways to this like local storage and session storage.

#### Server-Side Cache

Services like Redis allow web apps to temporarily store data in a layer that is accessible across different sessions and users. This pretty much is the most critical part of the architecture to solve the presented problem.

> I say this because technically in terms of making the booking tool viable, the client-side caching is a bit redudant with the server-side cache. It offers additional benefits like improved performance but in of itself does not make the booking tool viable given the conditions

There are other tools than Redis. I offer it because I've used it before, so it came to mind immediately. With this server-side cache, and logic that I will present the database access limit can be met

##### Redis Schema

We would need at least three caches:

1. Available items
2. Last fetched time
3. bookings

Redis has a capability where the cache can be expired. This could be set to an hour

### Routes and Controllers

This can be build with Express. I will show the necessary routes and how they might be written in [routes.js](server/routes/routes.js). I have mostly filled out templates for the controllers for Redis laid out in [controllers](server/controllers)

### Workflow / Logic

1. **Initial Fetch**: Triggered by the inital server startup and or user request. The source of truth (the third party database) is hit with a pull request. The information pulled is immediately stored in the server-side cache

2. **Subsequent User Requests**: Here we will first check the last fetched time that is stored in the server-side cache

   1. If there isn't data there, we know we should be all clear to pull from the database
   2. If the last fetched time is within an hour, serve the cached data
   3. If more than an hour has passed, fetch data directly from the database and update the cache

3. **Create New Bookings**: As far I understand, we can write to the database as often as we want. In the other submission I talk about how to avoid double booking complications, there should be a queue that is executed along side the single pull request allotted per hour. I go into more detail, but to link that with this system I would suggest that when it is determined that we should and can pull directly from the database, simultaneously we should handle the anti double booking logic
