const { Router } = require("express");
const router = Router();

router.get("/administrator", (req,res)=>{
  res.send("This is an admins-route");
});

module.exports = router;