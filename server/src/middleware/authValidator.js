
const jwt = require('jsonwebtoken');


const validateAuth = (req, res, next) => {
    const token = req.cookies.accessToken

    if (!token) {
        req.user = null
        return next()
    }

    try {
        req.user = jwt.verify(token, 'your-secret-key')
    } catch (error) {
        req.user = null;
    }


    next()
}

module.exports = { validateAuth };
