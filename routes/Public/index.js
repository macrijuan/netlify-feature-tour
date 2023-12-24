const { Router } = require("express");
const router = Router();

router.get('/test', (req,res)=>{
  res.send("This is a public-route");
});

module.exports.handler = router;