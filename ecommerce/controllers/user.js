const User = require('../models/user');
const { errorHandler } = require('../helper/dbErrorHandler');
const {Order} = require('../models/order')

exports.userById = (req, res, next, id) => {
    User.findById(id).exec((err, user) => {
        if (err || !user) {
            return res.status(400).json({
                error: 'User not found'
            });
        }
        req.profile = user;
        next();
    });


};
exports.read = (req, res) => {
    req.profile.hashed_password = undefined;
    req.profile.salt = undefined;
    return res.json(req.profile);
};

exports.update = (req, res) => {
    User.findOneAndUpdate({_id:req.profile._id},{$set:req.body.user},{new:true},(err,user)=>{
        if(err)
        {
            return res.status(400).json({
                err:"You're not authorized to perform this action"
            })
        }else{

            user.hashed_password = undefined
            user.salt=undefined
            if(req.body.user.name){

                user.name = req.body.user.name
            }
            if(req.body.user.email)
            {
                user.password=req.body.user.password
            }
            if(req.body.user.password)
            {
                user.passsword= req.body.user.password
            }
            console.log('----------------user g-------',user)

            res.json(user)
        }
    })
}


exports.purchaseHistory = (req,res)=>{
    
    Order.find({user:req.profile._id})
    .populate("user","_id name")
    .sort('-created')
    .exec((err,orders)=>{
        if(err)
        {
            return res.status(400).json({
                error:errorHandler(err)
            })
        }else{
            res.json(orders)
        }
    })
}