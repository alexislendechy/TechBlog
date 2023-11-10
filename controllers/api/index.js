const router = require('express').Router();

const userRoutes = require('./userRoutes');
const postRoutes = require('./postRoutes');
const commentdRoutes = require('./commentRoutes');

router.use('/user', userRoutes);
router.use('/post', postRoutes);
router.use('/comment', commentdRoutes);

module.exports = router;