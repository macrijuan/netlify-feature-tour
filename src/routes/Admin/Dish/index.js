const { Router } = require('express');
const router = Router();
const postDish = require("./Post");
const getDish = require("./Get/index.js");
const putDish = require("./Put");
const deleteDish = require("./Delete");

//getDish SENDS ONE OR MULTIPLE DISHES.
router.use("/dish", postDish, getDish, putDish, deleteDish );

module.exports = router;