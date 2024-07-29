# Server Folder

This is where all the example logic for what would need to happen to handle the asynchronous requests of the multiple users given the limit of one pull request from the database an hour

This is something I also will not be fully building out as the point of this exercise seems to be more of a proof of concept and technique than make this run rn

## What's in here

1. **routes folder**: this folder has all the individual routes we need and the logic to link them to the appropriate controller
2. **middleware**: I haven't actually written this. I can mock something out if needed but I am assuming right now that goes beyond this exercise as it would be pretty specific to the exact tech stack used. It is necessary which is why I am making a folder for it as it will handle authentication
3. **Controllers**: This is for the implementation of Redis with whatever third party database we are using. This is the heart of the logic for concurrency consideractions and solving the issue of how can multiple users work asynchronously with the third pary only allowing one fetch per hour

_The only specific tools I am talking about are express and Redis. I am already familiar with these two and I know they'd be able to handle this. If I was actually asked to execute this, I would spend time on researching other tools in case there's something better out there. With consideration of the time limit on this exercise I figured Express and Redis are acceptable_
