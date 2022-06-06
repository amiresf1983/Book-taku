const router = require('express').Router();

const userRoutes = require('./user-routes.js');
const bookRoutes = require('./book-routes.js');
const commentRoutes = require('./comment-routes.js');

router.use('/users', userRoutes);
router.use('/books', bookRoutes);
router.use('/comments', commentRoutes);

module.exports = router;
