const jwt = require('jsonwebtoken');

const authent = (req, res, next) =>{
    const accesstoken = req.headers['accesstoken']
    const refreshtoken = req.headers['refreshtoken']
    if(!accesstoken && !refreshtoken) {
        return res.send('Token not Provided')
    }
    try {
        const decoded = jwt.verify(accesstoken, JWT_SECRET_KEY)
        req.user = decoded.user
        next();
    } catch (error) {
        if(!refreshtoken) {
            return res.send('No refresh token provided')
        }
        try {
            const decoded = jwt.verify(refreshtoken, JWT_SECRET_KEY)
            const accesstoken = jwt.sign({user:decoded.user}, JWT_SECRET_KEY, {expiresIn : '2h'})
            res
            .headers('refreshToken', refreshtoken)
            .headers('accesstoken', accesstoken)
            .send(decoded.user);
            
        } catch (error) {
            return res.send('Invalid token')
        }
    }
}

module.exports = authent