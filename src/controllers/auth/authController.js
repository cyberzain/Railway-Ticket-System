const User = require('../../model/userModel');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

exports.registerUser = async (req, res) => {
    try {
        console.log(req.body);
    const { userName, email, password, phone, role } = req.body;  

    const existingUser = await User.findOne({ email });
    if (existingUser) {
        return res.status(400).json({ message: 'User already exists' });
    }

    const hash = await bcrypt.hash(password, 10);

    const newUser = new User({
        userName,
        email,
        password: hash,
        phone,
        role
    })

    await newUser.save();
   res.redirect('/login');
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error', error });
    }
};

exports.loginUser = async (req, res) => {
    try {
        const { email, password } = req.body;

        const user = await User.findOne({ email });

        if(!user) {
            return res.status(400).json({ message: 'Invalid credentials' });
        };

        const isMatch = await bcrypt.compare(password, user.password);


        if(isMatch) {
           const token = jwt.sign(
            { userId: user._id, role: user.role },
           "gtbsystem123",
            { expiresIn: '1h' }
           )
            user.accessToken = token;
            await user.save();

            res.cookie('token', token, { httpOnly: true });
          res.redirect('/dashboard');
        } else {
            return res.status(400).json({ message: 'Invalid credentials' });
        }

    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error', error });
    }
};