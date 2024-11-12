const router = require('express').Router();
const authMiddleware = require('../middlewares/authMiddleware');
const Chat = require('../models/chat');
const Message = require('../models/message');

router.post('/new-message', authMiddleware, async (req, res) => {
    try {
        // Store the message in message collection.
        const newMessage = new Message(req.body);
        const savedMessage = await newMessage.save();

        // Update the last message in chat collection.
        const currentChat = await Chat.findOneAndUpdate(
            {
                _id: req.body.chatId
            },
            {
                lastMessage: savedMessage._id,
                $inc: { unReadMessageCount: 1 }
            }
        )

        res.status(201).send({
            message: "Message sent successfully.",
            success: true,
            data: savedMessage
        })

    } catch (error) {
        res.send({
            message: error.message,
            success: false
        });
    }
});

router.get('/get-all-messages/:chatId', authMiddleware, async (req, res) => {
    try {
        const allMessages = await Message.find({ chatId: req.params.chatId }).sort({ createdAt: 1 })

        res.status(200).send({
            message: "Messages fetched succesasfully.",
            success: true,
            data: allMessages
        })
    } catch (error) {
        console.log(req.params.chatId);

        res.send({
            message: error.message,
            success: false,
        });
    }
});

module.exports = router;