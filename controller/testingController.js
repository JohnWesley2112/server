const router = require('express').Router();

router.get('/', async (req, res) => {
    res.send({
        message: "Vercel is working.",
        success: true
    })
});

module.exports = router