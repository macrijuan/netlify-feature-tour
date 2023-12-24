const { Router } = require('express');
const router = Router();
const postUser = require("./Post").handler;
const getUser = require("./Get").handler;
const putUser = require("./Put_Update");
const deleteUser = require("./Delete").handler;

router.use("/user", postUser, getUser, putUser, deleteUser);

module.exports.handler = router;