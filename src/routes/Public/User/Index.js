const { Router } = require('express');
const router = Router();
const postUser = require("./Post");
const getUser = require("./Get");
const putUser = require("./Put_Update");
const deleteUser = require("./Delete");

router.use("/user", postUser, getUser, putUser, deleteUser);

module.exports = router;