const { Router } = require('express');
const router = Router();
const administrator = require("./Admin");

router.get("/", (req,res)=>{res.send('API status: OK')});

router.use("/administrator", administrator);

module.exports.handler = router;