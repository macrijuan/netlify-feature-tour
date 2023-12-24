const {Router}=require("express");
const router = Router();
const getDiet = require("./Get").handler;
const postDiet = require("./Post").handler;
const putDiet = require("./Put").handler;
const deleteDiet = require("./Delete").handler;

router.use("/diet", getDiet, postDiet, putDiet, deleteDiet);

module.exports.handler = router;