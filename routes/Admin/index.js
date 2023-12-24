const { Router } = require("express");
const router = Router();

router.get("/test", async(req,res)=>{
  res.json("This is an admins-route");
});

module.exports.handler = router;