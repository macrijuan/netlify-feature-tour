const {Router}=require("express");
const router = Router();
const postReservation = require("./Post/index2.js");
const updateReservation = require("./Put");
const getReservation = require("./Get");
const deleteReservation = require("./Delete");

router.use("/reservation", postReservation, updateReservation, getReservation, deleteReservation);

module.exports.handler = router;