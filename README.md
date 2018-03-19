Log your daily activity with Angular 5 & Node  - MEAN stack application example. Uses mongoDB (MongoLabs) with CRUD functionality. You can use this project to build on top of it and create something bigger. It also demonstrates token based auth with JWT.

Working example of this app can be seen here (heroku): https://daily-log-node.herokuapp.com/
You can register and login, add logs and search archive by date.


To run, build backend & angular frontend and copy dist files to express '/static' folder; inside project folder run:

- npm install
- cd frontend
- npm install
- npm build 
- cd ..
- node app.js


When build, frontend files are copied to over to static folder with npm scripts, which is served by Express.

Same app build with Spring Boot (java) backend here: https://github.com/kle-pra/daily-logger-spring-boot

