const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const uri = require('../config')
mongoose.connect(uri());

const UserSchema = new mongoose.Schema({
  username:{
    type:String,
    unique:true
  },
  password:{
    type:String,
    set(val) {
      return(bcrypt.hashSync(val,10))
    }
  }
},{ db : 'your_progress' })

const User = mongoose.model('users',UserSchema);

module.exports = User