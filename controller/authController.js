const router = require('express').Router();
const User = require('../models/user');
const bcrypt = require('bcryptjs');
const jsonwebtoken = require('jsonwebtoken');


router.post('/signup', async (req, res) => {
    try {
        // Check if user exists
        const user = await User.findOne({ email: req.body.email });
        if (user) {
            return res.send({
                message: "User Exists.",
                success: false
            })
        }

        // If user exists, then encrypt the password
        const hashPassword = await bcrypt.hash(req.body.password, 10);
        req.body.password = hashPassword;

        // Create a new user and save the data
        const newUser = await new User(req.body);
        await newUser.save()
        res.status(201).send({
            message: 'New user created successfully',
            success: true
        })

    } catch (error) {
        res.send({
            message: error.message,
            success: false
        })
    }

})

router.post('/login', async (req, res) => {
    try {
        const isUser = await User.findOne({ email: req.body.email })

        if (!isUser) {
            return res.send({
                message: "Invalid user.",
                success: false
            })
        }

        const isPosswordValid = await bcrypt.compare(req.body.password, isUser.password);

        if (!isPosswordValid) {
            return res.send({
                message: "Invalid password.",
                success: false
            })
        }

        const token = jsonwebtoken.sign({ userId: isUser._id }, process.env.SECRET_KEY, { expiresIn: "1d" })
        res.send({
            message: "User login successful.",
            success: true,
            token: token
        })
    } catch (error) {
        res.send({
            message: error.message,
            success: false
        })
    }
})

module.exports = router;

