const User = require('../models/user')
const jwt = require('jsonwebtoken') //to generate signed token
const expressJwt = require('express-jwt') //for authorization check
const { errorHandler } = require('../helper/dbErrorHandler')
const { sendMail } = require('./mail')
//const fetchh = require('node-fetch')



exports.signup = (req, res) => {
    const user = new User(req.body)
    user.save((err, user) => {
        if (err) {
            return res.status(400).json({ err: errorHandler(err) });

        } else {

            user.salt = undefined;
            user.hashed_passsword = undefined;
            user.password = undefined;
            res.json({
                user
            })
        }
    })
}

exports.signin = (req, res) => {
    const { email, password } = req.body
    User.findOne({ email }, (error, user) => {
        if (error || !user) {
            return res.status(400).json({
                err: "User with that email doesn't exist. Please signup"
            })
        }
        //check password
        if (!user.authenticate(password)) {
            return res.status(400).json({
                error: 'Email and password dont match'
            })
        }

        const token = jwt.sign({ _id: user._id }, 'h12345')
        console.log('Token : ' + token)
        //persist token as 't' with expiry date
        res.cookie('t', 'token', { expire: new Date() + 9999 })
        const decodedJwt = jwt.decode(token, { complete: true });
        console.log("Decoded ID :", decodedJwt.payload)
        const { _id, name, email, role } = user
        return res.json({ token, user: { _id, name, email, role } })
    })


}

exports.signout = (req, res) => {
    res.clearCookie('t')
    res.json({ message: "Signout success" })
}

exports.requireSignin = expressJwt({
    secret: 'h12345',
    algorithms: ["HS256"], // added later
    userProperty: "auth",
});

exports.isAuth = (req, res, next) => {
    let user = req.profile._id == req.auth._id
    console.log(req.profile)
    console.log(req.auth)
    console.log(req.auth._id)

    if (!user) {
        return res.status(403).json({
            error: "Access denied"
        })
    }
    next();
}

exports.isAdmin = (req, res, next) => {
    if (req.profile.role === 0) {
        return res.status(403).json({
            error: "Admin resource! Acces denied"
        })
    }
    next()
}
