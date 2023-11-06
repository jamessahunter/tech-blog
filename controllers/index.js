const router = require('express').Router();

const apiRoutes = require('./api');
const homeRoutes = require('./home-routes.js');
const postRoutes = require('./posts-routes.js');

router.use('/', homeRoutes);
router.use('/api', apiRoutes);
router.use('/post',postRoutes);

module.exports = router;
