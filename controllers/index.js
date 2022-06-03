const router = require('express').Router();
const apiRoutes = require('./api');
//const libraryRoutes = require('./library-routes.js');
const homeRoutes = require('./home-routes.js'); // optional
// const commentRoutes = require('./api/comment-routes.js'); // optional

// the library page with the books
//router.use('/library', libraryRoutes);

// the library page with all the books 
router.use('/', homeRoutes);

// api routes 
router.use('/api', apiRoutes);

// router.use('/comments', commentRoutes);


router.use((req, res) => {
    res.status(404).end();
});

module.exports = router;