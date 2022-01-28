const jwt = require('jsonwebtoken');
module.exports = async(req, res, next) => {
    const authorizationHeader = req.headers.authorization;
    if (authorizationHeader) {
        const token = await req.headers.authorization.split(' ')[1];
        if (!token) {
            return res.status(403).json('No token trovided');
        }
        // console.log(token)
        try {
            jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
                if (err) {
                    console.log(err);
                    return res.status(401).json({
                        message: 'Your token not valid, it might be expired',
                    });
                }
                req.userId = decoded.data.id;
                // req.userType = decoded.data.role;
                next();
            });
        } catch (error) {
            console.log(error);
            return res.status(401).json({
                message: 'You are not logged in! Please login in to continue',
            });
        }


    } else {
        return res
            .status(401)
            .json({ message: 'Authentication error, token required' });
    }
};