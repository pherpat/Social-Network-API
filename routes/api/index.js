// Set requirements (express router)
const router = require('express').Router();

// set routes (user and thpught routes)
const thoughtRoutes = require('./thoughtRoutes');
const userRoutes = require('./userRoutes');

// add '/user and '/thought routes
router.use('/thought', thoughtRoutes);
router.use('/user', userRoutes);

//  export module router
module.exports = router;
