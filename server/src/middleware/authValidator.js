
const jwt = require('jsonwebtoken');


const validateAuth = (req, res, next) => {
    const token = req.cookies.accessToken

    if (!token) {
        req.user = null
        console.log(req.user);

        return next()
    }

    try {
        req.user = jwt.verify(token, 'your-secret-key')
    } catch (error) {
        req.user = null;
    }


    console.log(req.user);

    next()
}

module.exports = { validateAuth };
