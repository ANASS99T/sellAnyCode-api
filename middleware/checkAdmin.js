const jwt = require('jsonwebtoken');

module.exports = async (req, res, next) => {
  console.log('I m in token verification ...');

  const token = req.cookies?.access_token;

  if (!token) {
    return res.status(403).json({ message: 'No token provided' });
  } else {
    jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
      if (err) {
        console.log(err);
        return res
          .status(401)
          .json({ message: 'Your token is not valid, please re login' });
      } else {
        if (decoded?.data?.role === 'admin') {
          req.user = decoded?.data?.id;
          req.role = decoded?.data?.role;
          next();
        } else {
          return res
            .status(401)
            .json({ message: 'You don\' have access to this action' });
        }
      }
    });
  }
};
