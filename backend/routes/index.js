const router = require('express').Router()
const playerRoutes = require('./playerRoutes');
const teamRoutes = require('./teamRoutes');

router.use('/players', playerRoutes);
router.use('/teams', teamRoutes);

module.exports = router;