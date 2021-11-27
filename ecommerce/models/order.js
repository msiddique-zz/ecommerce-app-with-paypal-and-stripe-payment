const mongoose = require('mongoose')
const {ObjectId} = mongoose.Schema
const Schema = mongoose.Schema;

const CartSchema = new mongoose.Schema({

    product:{type:ObjectId, ref:"Product"},
    name: String,
    count: Number,
    price: Number

},{timestamps:true})

const CartItem= mongoose.model("CartItem",CartSchema)

const OrderSchema = new mongoose.Schema({

    products:[CartSchema],
    ammount: {type:Number},
    status:{
        type: String,
        default:"Not Processed",
        enum:["Not Processed","Processing","Paid","Shipped","Delivered","Cancelled"]
    },
    updated: Date,
    address:{type:String},
    user:{type: ObjectId, ref:"User"}
},{timestamps:true}
);

const Order = mongoose.model("Order", OrderSchema);

module.exports = { Order, CartItem };