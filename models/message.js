const mongoose = require('mongoose');

const messageSchema = new mongoose.Schema({
    chatId: {
        type: mongoose.Schema.Types.ObjectId, ref: "quick-chat-chats"
    },
    sender: {
        type: mongoose.Schema.Types.ObjectId, ref: "quick-chat-users"
    },
    text: {
        type: String,
        required: true
    },
    read: {
        type: Boolean,
        default: false
    }
}, { timestamps: true });

module.exports = mongoose.model("quick-chat-message", messageSchema);