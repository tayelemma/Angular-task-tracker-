const User = require("../models/usersModel");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const SECRET_KEY = "test123";

module.exports.login = async (req, res, next) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    if (!user) throw new Error("User not found");
    const match = await bcrypt.compare(password, user.password);
    if (!match) throw new Error("Wrong password");
    const token = { ...user, email, _id: user._id };
    const tokenHash = jwt.sign(token, SECRET_KEY);
    res.json({ success: true, data: tokenHash });
  } catch (e) {
    next(e);
  }
};
module.exports.signup = async (req, res, next) => {
  try {
    const { password } = req.body;
    const hash = await bcrypt.hash(password, 5);
    const result = await User.create({
      ...req.body,
      password: hash,
    });
    res.json({ success: true, data: result });
  } catch (e) {
    next(e);
  }
};
