const User = require("../models/user");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");


const isUserValid = async (username, password) => {
  const checkUsernameLength = username.length >= 8;
  const passwdCheckRegExp = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[\s\S]{8,16}$/;
  const checkPasswordFormat = passwdCheckRegExp.test(password);
  const checkUserExist = await User.findOne({ username: username });
  if (checkPasswordFormat && checkUserExist === null && checkUsernameLength) {
    return true;
  } else {
    return false;
  }
};

module.exports = {
  register: async (req, res, next) => {
    let { username, password } = req.body;
    if (await isUserValid(username, password)) {
      const newUser = await User.create({
        username: username,
        password: password,
      });
      req.user = newUser;
    }
    next();
  },
  login: async (req, res, next) => {
    let { username, password } = req.body;
    const user = await User.findOne({ username: username });

    if (!user) {
      return res.status(422).json({ message: "Username does not exist!" });
    }

    const isPasswordValid = bcrypt.compareSync(password, user.password);
    if (!isPasswordValid) {
      return res.status(421).json({ message: "Password is incorrect!" });
    }

    const token = jwt.sign(
      {
        id: String(user._id),
      },
      process.env.JWT_SECRET
    );

    User.updateOne({ username: username }, { token: token });
    req.user = { username, token };
    next();
  },

  
};
