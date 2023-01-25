const express = require("express");
const { getSeats, createTicket } = require("../controllers/seats");

const router = express.Router();

router.get("/:id", getSeats);
router.post("/", createTicket);

module.exports = router;
