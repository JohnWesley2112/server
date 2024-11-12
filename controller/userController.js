const router = require('express').Router();
const User = require('../models/user')
const authMiddleware = require('../middlewares/authMiddleware');


router.get('/get-logged-user', authMiddleware, async (req, res) => {
    try {
        const user = await User.findOne({ _id: req.body.userId });

        res.send({
            message: "User fetched successfully.",
            success: true,
            data: user
        })
    } catch (error) {
        res.send({
            message: error.message,
            success: false
        })
    }
});

router.get('/get-all-users', authMiddleware, async (req, res) => {
    try {
        const users = await User.find({ _id: { $ne: req.body.userId } });

        res.send({
            message: "All user fetched successfully.",
            success: true,
            data: users
        })
    } catch (error) {
        res.send({
            message: error.message,
            success: false
        })
    }
})

module.exports = router;