import { Router } from "express";
const router = Router();

router.get("/test", async(req,res)=>{
  res.json("This is an admins-route");
});

export default router;