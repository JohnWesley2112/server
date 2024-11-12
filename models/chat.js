const mongoose = require('mongoose');

const chatSchema = mongoose.Schema({
    members: {
        type: [
            { type: mongoose.Schema.Types.ObjectId, ref: 'quick-chat-users' }
        ]
    },
    lastMessage: {
        type: mongoose.Schema.Types.ObjectId, ref: 'quick-chat-messages'
    },
    unReadMessageCount: {
        type: Number,
        default: 0
    }
}, { timestamps: true });

module.exports = mongoose.model('quick-chat-chats', chatSchema);