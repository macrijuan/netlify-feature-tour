const { Router } = require("express");
const router = Router();

router.get('/public', (req,res)=>{
  res.send("This is a public-route");
});

module.exports = router;