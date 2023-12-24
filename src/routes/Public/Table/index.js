const {Router}=require("express");
const router = Router();
const getTable=require("./Get");

router.use("/table", getTable);

module.exports = router;