# Figure Five Frenzy

## Background
- Figure Five Fenzy is a math game
    - Get 5 cards, use math operations & grouping to match the target card.
    - Beat the time and post a high score.
- We're using RestBdIo as a backend-as-a-service to handle the high scores table.
- This is a port of a game I made in Flash in the early 2000's.

## Tech Stack
- The app is frontend only and uses React
- We're hosting it on an S3 bucket and using CloudFront as a CDN. As a result, hosting it is comically inexpensive.
