const { Router } = require('express');
const router = Router();
const user = require("./User");
const dish = require("./Dish");
const diet = require("./Diet");
const reservation = require("./Reservation");
const table = require("./Table");

router.use( "/", user, dish, diet, reservation, table );

module.exports = router;