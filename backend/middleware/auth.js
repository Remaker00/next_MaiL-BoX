const jwt = require('jsonwebtoken');
const User = require('../model/user');

exports.authenticate = async (req, res, next) => {
  try {
    const token = req.headers.authorization;
    const decodedToken = jwt.verify(token, process.env.TOKEN_SECRET);
    const userid = decodedToken.userId;

    const user = await User.findById(userid);
    if (user) {
      req.user = user;
      next();
    } else {
      throw new Error('User not found');
    }

  } catch (err) {
    console.log(err);
    return res.status(401).json({ success: false })
  }
}