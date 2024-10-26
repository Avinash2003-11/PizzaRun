const User = require('../models/userschema'); 
const { createJWT } = require('../middleware/authMiddleware');

exports.register = async (req, res) => {
    const { username, password } = req.body;

    try {
        const existingUser = await User.findOne({ username });
        if (existingUser) {
            return res.json({ status: false, message: 'User already exists! Please login.' });
        }

        const newUser = new User({ username, password });
        await newUser.save();
        res.json({ status: true, message: 'Registration successful. You can now login.' });
    } catch (error) {
        res.status(500).json({ status: false, message: 'Registration failed. Try again later.' });
    }
};

exports.login = async (req, res) => {
    const { username, password } = req.body;
    const user = await User.findOne({ username, password });

    if (user) {
        const token = createJWT({ username: user.username });
        res.json({ status: true, message: 'Login successful.', token });
    } else {
        res.json({ status: false, message: 'User does not exist. Please register.' });
    }
};
