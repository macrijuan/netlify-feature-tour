const {Router} = require("express");
const router = Router();

const administrator = require("./Admin");
const public = require("./Public");

router.use("/administrator", administrator);
router.use("/public", public);

exports = router;