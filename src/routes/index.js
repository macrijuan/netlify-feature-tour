const { Router } = require('express');
const router = Router();

const public = require("./Public").handler;
const admin = require("./Admin");

router.use("/public", public);
router.use("/administrator", admin);

module.exports.handler = router