const express = require('express');
const router = express.Router();
const User = require('../../model/userModel');

router.get('/dashboard',async (req, res) => {
    const user = req.user;

    const findUser = await User.findById(user.userId).select('-password');
    console.log(findUser);
    res.render('dashboard', { user: findUser });
});

module.exports = router;