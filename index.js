require('express-async-errors');
const app = require('./server/express');
const connectDB = require('./server/db/connect');
const config = require('./server/config/config');
const CustomError = require('./server/errors');
const fs = require('fs');
const http = require('http');
const https = require('https');
const path = require('path');
let httpsServer, httpServer, credentials, certificate, privateKey
// connect to mongo db
const mongoUrl = config.mongo.host;
const mongooseDebug = config.mongooseDebug;

try {
  //console.log(path.resolve(__dirname, './server/certificate/server.key'));
  privateKey  = fs.readFileSync('./server/certificate/server.key', 'utf8');
  certificate = fs.readFileSync('./server/certificate/server.cert', 'utf8');
  //console.log(privateKey, certificate)
  credentials = {key: privateKey, cert: certificate};
  httpServer = http.createServer(app);
  httpsServer = https.createServer(credentials, app); 
}
catch(error)
{
   throw new CustomError.InternalError(`Unable to read server certificate ${error.message}`);
}

// module.parent check is required to support mocha watch
// src: https://github.com/mochajs/mocha/issues/1912
 const start = async () => {
  if (!module.parent) {
    try {
      await connectDB(mongoUrl, mongooseDebug);        
      //app.listen(config.port, () => console.info(`Server started on port ${config.port} (${config.env})`))            
      httpServer.listen(config.httpPort, () => console.info(`Server (http) started on port ${config.httpPort} (${config.env})`))     
      httpsServer.listen(config.httpsPort, () => console.info(`Server (https) started on port ${config.httpsPort} (${config.env})`))     
    } catch (error) {
        //console.info(error);
        //throw new Error(`Unable to connect to database : ${error}`);
        throw new CustomError.InternalError(`Unable to connect to database : ${error}`);
    }
  }
};

start();

module.exports = app;