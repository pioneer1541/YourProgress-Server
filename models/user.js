const mongoose = require("mongoose");
const bcrypt = require("bcrypt");

require("dotenv").config();
const username = encodeURIComponent(process.env.DATABASE_USER);
const password = encodeURIComponent(process.env.DATABASE_PASSWD);
const clusterUrl = "yourprogress.aborr.mongodb.net";
const authMechanism = "DEFAULT";
const uri = `mongodb+srv://${username}:${password}@${clusterUrl}/users?authMechanism=${authMechanism}`;
console.log(uri)
mongoose.connect(uri)

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
  },
  token:{
    type:String
  }
},{ db : 'users' })

const User = mongoose.model('users',UserSchema);

module.exports = User