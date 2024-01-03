const {Router}=require("express");
const router = Router();
const dish = require("./Dish").handler;
const user = require("./User/Get").handler;
const diet = require("./Diet").handler;
const admin = require("./Admin").handler;
const inventory = require("./Inventory").handler;
const reservation = require("./Reservation").handler;
const table = require("./Table").handler;
const option = require("./Option").handler;

router.use( 
  ( req, res, next )=>{ 
    console.log( req.body.length ); 
    next(); 
  }, 
  user, dish, diet, admin, inventory, reservation, table, option
);

module.exports.handler=router;