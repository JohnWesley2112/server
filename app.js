const express = require('express');
var cors = require('cors')
const authRouter = require('./controller/authController');
const userRouter = require('./controller/userController');
const chatRouter = require('./controller/chatController');
const messageRouter = require('./controller/messageController');
const testingRouter = require('./controller/testingController');

const app = express();

// middleware
app.use(express.json());
app.use(cors())
app.use('/api/auth', authRouter);
app.use('/api/user', userRouter);
app.use('/api/chat', chatRouter);
app.use('/api/message', messageRouter);
app.use(testingRouter);

module.exports = app;