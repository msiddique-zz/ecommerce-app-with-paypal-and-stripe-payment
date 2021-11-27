const mongoose = require('mongoose')

const categorySchema = new mongoose.Schema({
    name:{
        trim: true,
        unique: true,
        maxlength: 32,
        type:String,
        required:true,

    }
},
    {timestamps:true}
);

module.exports= mongoose.model("Category",categorySchema)