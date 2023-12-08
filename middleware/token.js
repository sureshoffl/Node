const jwt = require('jsonwebtoken');

const token = (req, res, next) => {
    const accessToken = req.headers['accessToken']
    const refreshToken = req.headers['refreshToekn']

    if(!accessToken && refreshToken) {
        return res.send('No Token Provided')
    }

    try {
        const decoded =  jwt.verify(accessToken, process.env.JWT_SECRET_KEY);
        req.user = decoded.user
        next();
    } catch (error) {
        if(!refreshToken) {
                return res.send('No refresh token Provided')
        }
        try {
            const decoded = jwt.verify(refreshToken, process.env.JWT_SECRET_KEY)
            const accessToken = jwt.sign({user : decoded.user}, JWT_SECRET_KEY, {expiresIn : '1h'})
            return res.send(!_.isEmpty(accessToken) ? accessToken : null)
        } catch (error) {
            return res.send(error)
        }
    }
}

module.exports = token