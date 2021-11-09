const express = require('express');

const logger = require('morgan');
const cookieParser = require('cookie-parser');
const compress = require('compression');
const methodOverride = require('method-override');
const httpStatus = require('http-status');
const expressWinston = require('express-winston');
const fileUpload = require('express-fileupload');

const rateLimiter = require('express-rate-limit');
const helmet = require('helmet');
const xss = require('xss-clean');
const cors = require('cors');
const mongoSanitize = require('express-mongo-sanitize');

const winstonInstance = require('./config/winston');
const routes = require('../index.route');
const config = require('./config/config');
const errorMiddleware = require('./middleware/error-handler');

const app = express();

if (config.env === 'development') {
  app.use(logger('dev'));
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
app.use(cookieParser());
app.use(compress());
app.use(methodOverride());
app.use(fileUpload());

//Ramesh Check this below code
// enable detailed API logging in dev env
if (config.env === 'development') {
  expressWinston.requestWhitelist.push('body');
  expressWinston.responseWhitelist.push('body');
  app.use(expressWinston.logger({
    winstonInstance,
    meta: true, // optional: log meta data about request (defaults to true)
    msg: 'HTTP {{req.method}} {{req.url}} {{res.statusCode}} {{res.responseTime}}ms',
    colorStatus: true // Color the status code (default green, 3XX cyan, 4XX yellow, 5XX red).
  }));
}

// mount all routes on /api path
app.use('/api', routes);

app.use(notFoundMiddleware);
app.use(errorMiddleware);

// log error in winston transports 
 app.use(expressWinston.errorLogger({
    winstonInstance
}));

//Ramesh Check this below code
// error handler, send stacktrace only during development
app.use((err, req, res, next) => // eslint-disable-line no-unused-vars
  res.status(err.status).json({
    message: err.isPublic ? err.message : httpStatus[err.status],
    stack: config.env === 'development' ? err.stack : {}
  })
);

module.exports = app;