const router = require('express').Router();
const UserRoutes = require('./UserRoutes');
const ThoughtRoutes = require('./ThoughtRoutes');

router.use('/Users',UserRoutes);
router.use('/Thoughts',ThoughtRoutes);

module.exports = router;