const { Router } = require('express');
const router = Router();


const admin = require("./Admin");


router.use("/administrator", admin);

module.exports.handler = router