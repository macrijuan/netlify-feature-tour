const { Router } = require("express");
const router = Router();

router.get("/administrator", async(req,res)=>{
  res.send("This is an admins-route");
});

module.exports.handler = router;