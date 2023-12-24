const { Router } = require("express");
const router = Router();

router.get("/test", async(req,res)=>{
  res.json("This is a public-route");
});

module.exports.handler = router;