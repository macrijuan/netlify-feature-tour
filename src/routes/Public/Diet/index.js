const {Router}=require("express");
const router = Router();
const getDiet = require("../../Public/Diet/Get");

router.use("/diet", getDiet);

module.exports = router;