import { Router } from "express";
const router = Router();

import administrator from "./Admin";
import _public from "./Public";

router.use("/administrator", administrator);
router.use("/public", _public);

export default router;