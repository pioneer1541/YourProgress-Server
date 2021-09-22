const User = require("../models/user");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const isUserValid = async (username, password) => {
  const checkUsernameLength = username.length >= 8;
  const passwdCheckRegExp = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[\s\S]{8,16}$/;
  const checkPasswordFormat = passwdCheckRegExp.test(password);
  const checkUserExist = await User.findOne({ username: username });
  if (!checkUsernameLength) {
    return {result:false,message:"Username length is incorrect!"}
  }
  if (!checkPasswordFormat) {
    return {result:false,message:"Password does not meet requirement!"}
  }
  if (checkUserExist) {
    return {result:false,message:"User has existed!"}
  }
  return {result:true,message:"Success!"}
};

module.exports = {
  register: async (req, res, next) => {
    let { username, password } = req.body;
    const checkResult = await isUserValid(username, password)
    if (checkResult.result) {
      const newUser = await User.create({
        username: username,
        password: password,
      });
      console.log(newUser)
      req.user = newUser;
    } else {
      req.user = false;
      req.message = checkResult.message
    }
    next();
  },
  login: async (req, res, next) => {
    let { username, password } = req.body;
    const user = await User.findOne({ username: username });

    if (user) {
      if (!bcrypt.compareSync(password, user.password)) {
        req.user = false;
        req.message = 'Password does not match the username,please check it again.'

      } else {
        const token = jwt.sign(
          {
            id: String(user._id),
          },
          process.env.JWT_SECRET
        );

        User.updateOne({ username: username }, { token: token });
        req.user = { username, token };
      }
    } else {
      req.user = false;
      req.message = 'Can not find the user,please check it again!.'

    }
    next();
  },
};
