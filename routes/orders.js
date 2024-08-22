

const express = require('express');
const router = express.Router();
const orderControllers = require('../controlers');

router.post('/', orderControllers.addOrder);

module.exports = router; // Експорт маршруту
