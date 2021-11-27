const mongoose = require('mongoose')
const {ObjectId} = mongoose.Schema

const productSchema = new mongoose.Schema({
    name:{
        trim: true,
        unique: 32,
        maxlength: 40,
        type:String,
        required:true,
    },
    description:{
        maxlength:2000,
        type: String,
        required:true,        
    },
    price:{
        type: Number,
        required: true,
        maxlength:32
    },
    category:{
        type: ObjectId,
        ref: 'Category',
        required:true,

    },
    sold:{
        type:Number
    },
    quantity:{
        type: Number
    },
    photo:{
        data: Buffer,
        contentType: String
    },
    shipping: {
        required: false,
        type: Boolean
    }
},
    {timestamps:true}
);

module.exports= mongoose.model("Product",productSchema)