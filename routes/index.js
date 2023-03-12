// Set requirements(express router)
const router = require('express').Router();

// api routes
const apiRoutes = require('./api');

// '/api to all routes
router.use('/api', apiRoutes);

// wrong route
router.use((req, res) => res.send('Wrong route!'));

// Export module router
module.exports = router;