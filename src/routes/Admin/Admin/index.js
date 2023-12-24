const { Router } = require('express');
const router = Router();
const postAdmin = require("./Post").handler;
const putAdmin = require("./Put").handler;
const deleteAdmin = require("./Delete").handler;
const getAdmin = require("./Get").handler;

//getAdmin gets one or multiple administrators
router.use("/admin", postAdmin, getAdmin, putAdmin, deleteAdmin);

module.exports.handler = router;