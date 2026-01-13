
const express = require('express');
const router = express.Router();
const User = require('../../model/userModel');
const TrainRoutModel = require("../../model/trainRoutes");

router.get('/dashboard',async (req, res) => {
    const user = req.user;

    const findUser = await User.findById(user.userId).select('-password');
    console.log(findUser);
    res.render('dashboard', { user: findUser });
});

router.get("/bookTicket", async (req, res) => {
    const trainRoute = await TrainRoutModel.find();
    res.render("bookTicket", {trainRoute});
})


module.exports = router;