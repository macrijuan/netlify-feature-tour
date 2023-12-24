const {Router}=require("express");
const router = Router();
const postTable = require("./Post").handler;
const getTable = require("../../Public/Table/Get");
const putTable = require("./Put").handler;
const deleteTable = require("./Delete").handler;

router.use("/table", postTable, getTable, putTable, deleteTable);

module.exports.handler = router;