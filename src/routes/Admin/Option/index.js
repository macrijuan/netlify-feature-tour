const { Router } = require('express');
const router = Router();
const getOption = require("./Get").handler;

router.use("/option", getOption);

module.exports.handler = router;