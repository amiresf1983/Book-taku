const router = require('express').Router();
const apiRoutes = require('./api');
const homeRoutes = require('./book-routes.js');
const dashboardRoutes = require('./dashboard-routes.js'); // optional

router.use('/dashboard', dashboardRoutes);
router.use('/', homeRoutes);
router.use('/api', apiRoutes);


router.use((req, res) => {
    res.status(404).end();
});

module.exports = router;