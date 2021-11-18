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
const {winstonLogger, winstonInstance}  = require('../server/logger')
const httpStatus = require('http-status');

const corsOptions = {  origin: "http://localhost:8081" };

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
//app.use(cors());
app.use(cors(corsOptions));
app.use(xss());
app.use(mongoSanitize());

app.use(express.static('./public'));

app.use(express.json());
app.use(express.urlencoded({ extended: false }))
app.use(cookieParser(process.env.JWT_SECRET));
app.use(compress());
app.use(methodOverride());
app.use(fileUpload());

if (config.env === 'development') {
  expressWinston.requestWhitelist.push('body');
  expressWinston.responseWhitelist.push('body');
  app.use(expressWinston.logger({   
    winstonInstance,
    meta: true, // optional: log meta data about request (defaults to true)
    msg: 'HTTP {{req.method}} {{req.url}} {{res.statusCode}} {{res.responseTime}}ms',
    colorStatus: true // Color the status code (default green, 3XX cyan, 4XX yellow, 5XX red).
  })); 
} else {
  app.use(expressWinston.logger({winstonInstance})); //check if necessary log in production
}

// mount all routes on /api path
app.use('/api', routes);

app.use(expressWinston.errorLogger({ winstonInstance }));

//error handling
app.use(notFoundMiddleware);
app.use(errorMiddleware);

/*// error handler, send stacktrace only during development
app.use((err, req, res, next) =>  res.status(err.status).json({message: err.isPublic ? err.message : httpStatus[err.status], stack: config.env === 'development' ? err.stack : {} }));*/

module.exports = app;