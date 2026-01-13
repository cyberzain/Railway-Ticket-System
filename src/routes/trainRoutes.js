const router = require("express").Router();

const{
    bookTicket
} = require("../controllers/trainCtrl")


router.post("/bookTicket",bookTicket );

module.exports = router;