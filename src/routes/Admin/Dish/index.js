const { Router } = require('express');
const router = Router();
const postDish = require("./Post").handler;
const getDish = require("./Get/index.js").handler;
const putDish = require("./Put").handler;
const deleteDish = require("./Delete").handler;

//getDish SENDS ONE OR MULTIPLE DISHES.
router.use("/dish", postDish, getDish, putDish, deleteDish );

module.exports.handler = router;