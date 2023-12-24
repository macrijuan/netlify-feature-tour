const { Router } = require('express');
const router = Router();

const public = require("./Public");
const admin = require("./Admin");

router.use("/public", public);
router.use("/administrator", admin);

module.exports = router