const{Router}=require("express");
const router = Router();
const postInventory = require("./Post");
const getInventory = require("./Get");
const putInventory = require("./Put");
const deleteInventory = require("./Delete");

router.use("/inventory",  postInventory, getInventory, putInventory, deleteInventory);

module.exports.handler = router;