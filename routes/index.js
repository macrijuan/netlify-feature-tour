const { Router } =require("express") ;
const router = Router();

const administrator = require("./Admin");
const _public = require("./Public");

router.use("/administrator", administrator.handler);
router.use("/public", _public.handler);

module.exports.handler = router;