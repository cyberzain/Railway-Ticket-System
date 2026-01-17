const Train = require("../model/trainRoutes");
const bookTicket = require("../model/bookedTicketModel");
exports.bookTicket = async (req, res) => {
    try {
        const { fStation, tStation, trainRoute, jDate, trainType, nop, tAmount } = req.body;


        const findRout = await Train.findOne({ trainRoute });
        if (!findRout) {
            res.send("route not found");
        }
        console.log(findRout)
        const distance = findRout.distance;
        console.log("distance ", distance)
        let amountPerKm = 0;

        if (trainType == "General") {
            amountPerKm = 0.5;
        }
        else {
            amountPerKm = 0.9;
        }
        const pnr =await generatePNR();
        const uts =await  generateUTS();
        const subTotal = distance * amountPerKm;
        const totalAmount = subTotal * nop;
        console.log(totalAmount)
        const newBookTicket = new bookTicket({
            fromStation: findRout.fromStation,
            toStation: findRout.toStation,
            distance: findRout.distance,
            jTime: findRout.jTime,
            nop: nop,
            trainRoute: trainRoute,
            totalAmount: totalAmount,
            jDate: jDate,
            pnr: pnr,
            utsNo:uts
        })
        await newBookTicket.save();

        res.redirect(`/bookTicket?showTicket=true&ticketId=${newBookTicket._id}`);



    } catch (error) {
        console.log(error);
        res.status(500).send("error")
    }
}


const generatePNR = async() => {
    const PNR = await  Math.floor(100000 + Math.random() * 900000);
    return 'PNR' + PNR;
}

const generateUTS = async () => {
    const UTS = await Math.floor(100000 + Math.random() * 900000);
    return 'UTS' + UTS;
}

