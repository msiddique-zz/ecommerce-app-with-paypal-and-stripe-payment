const User = require('../models/user')
const { Order, CartItem } = require('../models/order')
const errorHandler = require('../helper/dbErrorHandler')

exports.create = (req, res) => {
    console.log("---------------------------------in order create---------------------")
    req.body.order.user = req.profile
    const order = new Order(req.body.order)
    order.save((error, data) => {
        if (error) {
            return res.status(400).json({
                error: errorHandler(error)
            })
        } else {
            res.json(data)
        }
    })

}

exports.addOrderToUserHistory = (req, res, next) => {

    let history = []
    req.body.order.products.forEach((item) => {
        history.push({
            _id: item._id,
            name: item.name,
            description: item.description,
            price: item.price,
            quantity: item.count
        })
    })

    User.findOneAndUpdate({ _id: req.profile._id }, { $push: { history: history } }, { new: true },

        (err, data) => {
            if (err) {
                return res.status(400).json({
                    error: "Couldn't update user purchase history"
                })
            }
            next();
        }
    )

}


exports.listOrders = (req, res) => {
    Order.find()
        .populate('user', "id name password")
        .sort('-created')
        .exec((err, orders) => {
            if (err) {
                return res.status(400).json({
                    error: errorHandler(err)
                })
            }
            res.json(orders)
        })
}

exports.getStatusValues = (req, res) => {
    let arrayy = Order.schema.path('status').enumValues
    console.log('================================orders=====================', arrayy)
    res.json(arrayy)


}











