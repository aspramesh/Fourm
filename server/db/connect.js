const mongoose = require('mongoose');
const util = require('util');
const debug = require('debug')('express-mongoose-es6-rest-api:index');
// make bluebird default Promise
Promise = require('bluebird'); // eslint-disable-line no-global-assign
// plugin bluebird promise in mongoose
mongoose.Promise = Promise;

//mongoose.connect(mongoUrl, {useNewUrlParser: true }, () => console.info('Connected to DB'));
const connectDB = (mongoUrl, mongooseDebug) => {    
    //let returnPromise = mongoose.connect(mongoUrl, {server: { socketOptions: { keepAlive: 1 }}})
    //let returnPromise = mongoose.connect(mongoUrl, { useNewUrlParser: true, useUnifiedTopology: true });
    let returnPromise = mongoose.connect(mongoUrl, { useNewUrlParser: true, useUnifiedTopology: true });  

    mongoose.connection.on('error', () => {       
      throw new Error(`unable to connect to database: ${mongoUrl}`);
    });

    // print mongoose logs in dev env
   if (mongooseDebug) {
        mongoose.set('debug', (collectionName, method, query, doc) => {
            debug(`${collectionName}.${method}`, util.inspect(query, false, 20), doc);
         });
    }
    return returnPromise;
}

module.exports = connectDB;