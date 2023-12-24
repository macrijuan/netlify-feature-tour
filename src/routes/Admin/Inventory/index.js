const{Router}=require("express");
const router = Router();
const postInventory = require("./Post").handler;
const getInventory = require("./Get").handler;
const putInventory = require("./Put").handler;
const deleteInventory = require("./Delete").handler;

router.use("/inventory",  postInventory, getInventory, putInventory, deleteInventory);

module.exports.handler = router;