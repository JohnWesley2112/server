require('dotenv').config({ path: '../config.env' });
const mongoose = require('mongoose');

mongoose.connect(process.env.CONNECTION_STRING);

const db = mongoose.connection;

db.on('connected', async () => {
    console.log('Database connection established.');
})

db.on('err', async () => {
    console.log('Database connection failed.');
})

module.exports = db;