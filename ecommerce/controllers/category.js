const Category = require('../models/category')
const { errorHandler } = require('../helper/dbErrorHandler')


exports.read = (req, res) => {
    return res.json(req.category)
}

exports.list = (req, res) => {
    Category.find().exec((err, data) => {
        if (err) {
            return res.status(400).json({
                error: errorHandler(err)
            });
        }
        res.json(data);
    });
}
exports.create = (req, res) => {
    const category = new Category(req.body)
    category.save((error, data) => {
        if (error) {
            return res.status(400).json({
                error: errorHandler(error)
            })
        }
        res.json({
            data
        })

    })

}

