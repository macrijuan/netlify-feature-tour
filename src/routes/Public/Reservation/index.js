const {Router}=require("express");
const router = Router();
const postReservation = require("./Post/index2.js");
const updateReservation = require("./Put").handler;
const getReservation = require("./Get").handler;
const deleteReservation = require("./Delete").handler;

router.use("/reservation", postReservation, updateReservation, getReservation, deleteReservation);

module.exports.handler = router;