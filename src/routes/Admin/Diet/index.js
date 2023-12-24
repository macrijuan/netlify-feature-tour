const {Router}=require("express");
const router = Router();
const getDiet = require("./Get");
const postDiet = require("./Post");
const putDiet = require("./Put");
const deleteDiet = require("./Delete");

router.use("/diet", getDiet, postDiet, putDiet, deleteDiet);

module.exports.handler = router;