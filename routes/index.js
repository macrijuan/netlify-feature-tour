const { Router } =require("express") ;
const router = Router();

const administrator = require("./Admin");
const _public = require("./Public");

router.use("/administrator", administrator);
router.use("/public", _public);

module.exports.handler = router;