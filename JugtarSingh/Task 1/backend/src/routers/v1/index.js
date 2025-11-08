const TodoRoutes = require('./todo-routers');
const express = require('express');
const router = express.Router();


router.use('/todos',TodoRoutes);

module.exports = router ;