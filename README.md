WEBSITE FOR DJ PRODUCER LOCODA - https://www.instagram.com/locodadnb/
A web responsive website for displaying infomation about the artist, links to music, display tour dates, links to socials and more.  

Functionalities:

A landing page

Landing Page - Highlighing New Release Video
Tour Dates page - with links to events, tickets and other links.

Releases Page - listing all current releases and linking though to a dynamic page for more detials on each release.
About page - listing backgound infomation about the Artist
Contact Page - Listing all email contacts and social media links
User registration, login (with session tokens), logout function.
Databse editable by logged in user to display new tour dates, releases, update about poge.


Technologies:
Next.js
TypeScript
JavaScript
PostgreSQL
Emotion/css
Playwright for E2E testing
DrawSQL
FIGMA for Design and wireframes


Screenshots:


## ---------------------------------------------


## API design:

base URL (for development) :http://localhost:3000/api/

1. Reading all releases: 'GET /releases' ===> api/releases/index.js
2. Creating a new release to releases: 'POST /releases' ===> api/releases/index.js

3. Reading a single release: 'GET /releases/:id ====> api/releases/[releaseID].js 
4. Updating a single release: 'PUT /releases/:id ====> api/releases/[releaseID].js 
5. Reading a single release: 'DELETE /releases/:id ====> api/releases/[releaseID].js 
