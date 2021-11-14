const express = require('express');


const morganlogger = require('morgan');
const cookieParser = require('cookie-parser');
const compress = require('compression');
const methodOverride = require('method-override');
const StatusCodes = require('http-status');
const expressWinston = require('express-winston');
const fileUpload = require('express-fileupload');

const rateLimiter = require('express-rate-limit');
const helmet = require('helmet');
const xss = require('xss-clean');
const cors = require('cors');
const mongoSanitize = require('express-mongo-sanitize');

const routes = require('../index.route');
const config = require('./config/config');
const errorMiddleware = require('./middleware/error-handler');
const notFoundMiddleware = require('./middleware/not-found');
const winstonLogger  = require('../server/logger')

const app = express();

/*winstonLogger.log({heading:'express.js', level: 'error', message: 'This is super secret - hide it.' });
winstonLogger.error("error log")
winstonLogger.warn("warning log")
winstonLogger.info("information log")
winstonLogger.http("http log")
winstonLogger.verbose("verbose log")
winstonLogger.debug("debug log")
winstonLogger.silly("silly log")*/

if (config.env === 'development') {
  app.use(morganlogger('dev'));
}

app.set('trust proxy', 1);
app.use(
  rateLimiter({
    windowMs: 15 * 60 * 1000,
    max: 60,
  })
);
app.use(helmet());
app.use(cors());
app.use(xss());
app.use(mongoSanitize());
app.use(express.static('./public'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }))
app.use(cookieParser(process.env.JWT_SECRET));
app.use(compress());
app.use(methodOverride());
app.use(fileUpload());

app.use((req, res, next) => {
    winstonLogger.info("Request header " +  req.method + " " + req.url);
    //winstonLogger.info("Request body " + {...req.body});
    next();
});

// mount all routes on /api path
app.use('/api', routes);


//error handling
app.use(notFoundMiddleware);
app.use(errorMiddleware);

module.exports = app;