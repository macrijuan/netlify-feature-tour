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
    const string = req.body.toString(); 
    const data = JSON.parse(string); 
    console.log( data ); 
    next(); 
  }, 
  user, dish, diet, admin, inventory, reservation, table, option
);

module.exports.handler=router;