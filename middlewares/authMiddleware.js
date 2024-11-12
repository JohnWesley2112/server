const jwt = require('jsonwebtoken');

module.exports = async (req, res, next) => {
    try {
        const token = await req.headers.authorization.split(' ')[1];
        const decodedToken = jwt.verify(token, process.env.SECRET_KEY);
        req.body.userId = decodedToken.userId;
        next();
    } catch (error) {
        console.log(error.message);

        res.send({
            message: error.message,
            success: false
        })
    }
}