const express = require('express');
const userRoutes = require('./server/routes/userRoutes');
const authRoutes = require('./server/routes/authRoutes');
const router = express.Router(); 

// TODO: use glob to match *.route files

/** GET /health-check - Check service health */
router.get('/health-check', (req, res) =>
  res.send('OK')
);

// mount user routes at /users
router.use('/users', userRoutes);

// mount auth routes at /auth
router.use('/auth', authRoutes);

module.exports = router;
