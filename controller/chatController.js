const router = require('express').Router();
const authMiddleware = require('../middlewares/authMiddleware');
const Chat = require('../models/chat');

router.post('/create-new-chat', authMiddleware, async (req, res) => {
    try {
        const chat = new Chat(req.body);
        const savedChat = await chat.save();
        res.status(201).send({
            message: "Chat created successfully.",
            success: true,
            data: savedChat
        })
    } catch (error) {
        res.send({
            message: error.message,
            success: false
        })
    }
})

router.get('/get-all-chat', authMiddleware, async (req, res) => {
    try {
        const allChat = await Chat.find({ members: { $in: req.body.userId } });

        res.status(200).send({
            message: "Chat fetched successfully.",
            success: true,
            data: allChat
        });
    } catch (error) {
        res.send({
            message: error.message,
            success: false
        })
    }
})

module.exports = router