const{Router}=require("express");
const router = Router();

const getReservations = require("./Get");

router.use("/reservation", getReservations);

module.exports = router;