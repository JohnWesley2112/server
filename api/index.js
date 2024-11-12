require('dotenv').config({ path: '../config.env' });
const dbConfig = require('../config/dbConfig');
const app = require('../app');

const PORT = process.env.PORT

app.listen(PORT, () => {
    console.log('Server is up on port ', PORT);
})

