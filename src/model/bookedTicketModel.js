const mongoose = require("mongoose");

const bookedTicketSchema = new mongoose.Schema({
    fromStation: String,
    toStation:String,
    distance: Number,
    jTime:Date,
    jDate:Date,
    nop:Number,
    trainRoute:Number,
    totalAmount:Number
}, {
    timestamps: true
});

module.exports = mongoose.model("book-ticket", bookedTicketSchema)