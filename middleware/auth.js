const jwt = require('jsonwebtoken')
const User = require('../models/user')



module.exports={
    auth:async (req, res, next) => {
        let tokenRaw = String(req.headers.auth.pop())

        let token = jwt.verify(tokenRaw,process.env.JWT_SECRET)

        const id = token.id;

        req.user = await User.findById(id);
        next();
    }
}