const { Router } = require('express');
const router = Router();
const postAdmin = require("./Post");
const putAdmin = require("./Put");
const deleteAdmin = require("./Delete");
const getAdmin = require("./Get");

//getAdmin gets one or multiple administrators
router.use("/admin", postAdmin, getAdmin, putAdmin, deleteAdmin);

module.exports = router;