const{Router}=require("express");
const router = Router();

const getReservations = require("./Get").handler;

router.use("/reservation", getReservations);

module.exports.handler = router;