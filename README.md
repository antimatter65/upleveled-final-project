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


The project use the folling tech stack:

![JavaScript](https://img.shields.io/badge/javascript-%23323330.svg?style=for-the-badge&logo=javascript&logoColor=%23F7DF1E)
![TypeScript](https://img.shields.io/badge/typescript-%23007ACC.svg?style=for-the-badge&logo=typescript&logoColor=white)
![Next JS](https://img.shields.io/badge/Next-black?style=for-the-badge&logo=next.js&logoColor=white)
![React](https://img.shields.io/badge/react-%2320232a.svg?style=for-the-badge&logo=react&logoColor=%2361DAFB)
![NodeJS](https://img.shields.io/badge/node.js-6DA55F?style=for-the-badge&logo=node.js&logoColor=white)
![HTML5](https://img.shields.io/badge/html5-%23E34F26.svg?style=for-the-badge&logo=html5&logoColor=white)
![CSS3](https://img.shields.io/badge/css3-%231572B6.svg?style=for-the-badge&logo=css3&logoColor=white)
![Postgres](https://img.shields.io/badge/postgres-%23316192.svg?style=for-the-badge&logo=postgresql&logoColor=white)
![Visual Studio Code](https://img.shields.io/badge/VS%20Code-0078d7.svg?style=for-the-badge&logo=visual-studio-code&logoColor=white)

The project is deloyed here on Heroku : https://locoda-website.herokuapp.com/

## ---------------------------------------------


## Example API design:

base URL (for development) :http://localhost:3000/api/

1. Reading all releases: 'GET /releases' ===> api/releases/index.js
2. Creating a new release to releases: 'POST /releases' ===> api/releases/index.js

3. Reading a single release: 'GET /releases/:id ====> api/releases/[releaseID].js 
4. Updating a single release: 'PUT /releases/:id ====> api/releases/[releaseID].js 
5. Reading a single release: 'DELETE /releases/:id ====> api/releases/[releaseID].js 
