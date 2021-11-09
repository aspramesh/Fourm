require('express-async-errors');
const app = require('./server/express');
const connectDB = require('./server/db/connect');
const config = require('./server/config/config');

// connect to mongo db
const mongoUrl = config.mongo.host;
const mongooseDebug = config.mongooseDebug;

// module.parent check is required to support mocha watch
// src: https://github.com/mochajs/mocha/issues/1912
 const start = async () => {
  if (!module.parent) {
    try {
      await connectDB(mongoUrl, mongooseDebug);
      app.listen(config.port, () => console.info(`Server started on port ${config.port} (${config.env})`))     
    } catch (error) {
        //console.info(error);
        throw new Error(`Unable to connect to database : ${error}`);
    }
  }
};

start();

module.exports = app;