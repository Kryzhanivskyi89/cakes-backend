const express = require('express');

const ordersRouter = express.Router();

const orderControllers = require('../../../controlers/orders');

const { isValidId, authenticate } = require('../../../middlewares');

const schemas = require("../../../schemas/orders");

const { validateBody } = require("../../../decorators");

// router.use("/", authenticate);

ordersRouter.post('/',
    // validateBody(schemas.ordersAddSchema),
    orderControllers.addOrder);


module.exports = ordersRouter;