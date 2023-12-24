const {Router}=require("express");
const router = Router();
const postTable = require("./Post");
const getTable = require("../../Public/Table/Get");
const putTable = require("./Put");
const deleteTable = require("./Delete");

router.use("/table", postTable, getTable, putTable, deleteTable);

module.exports = router;