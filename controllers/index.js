const router = require('express').Router();
const apiRoutes = require('./api');
const homeRoutes = require('./home-routes.js'); // optional

// the library page with all the books
router.use('/', homeRoutes);

// api routes
router.use('/api', apiRoutes);

router.use((req, res) => {
  res.status(404).end();
});

module.exports = router;
