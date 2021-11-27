const mongoose = require('mongoose')
const crypto = require('crypto')
const uuid = require('uuid')

const userSchema = new mongoose.Schema({
    name:{
        trim: true,
        maxlength: 32,
        type:String,
        required:true
    },
    email:{
        trim: true,
        unique: true,
        type:String,
        required:true
    },
    hashed_password:{
        type:String,
        required:true
    },
    about:{
        trim: true,
        type:String,
    },
    salt: String,
     role:{
         type:Number,
         default:0
     },
     history:{
         type:Array,
         default:[]
     },
     facebookId:String
},{timestamps:true}
);

//virtual field
userSchema.virtual('password')
.set(function(password)
{
    this._password=password,
    this.salt=uuid.v1(),
    this.hashed_password = this.encryptPassword(password)

})
.get(()=>{
   return this._password; 
})


userSchema.methods = {

    authenticate: function(plainText){
        return this.encryptPassword(plainText)===this.hashed_password
    },

    encryptPassword: function(password){
        if(!password){
                return ''
        }
        try{
            return crypto.Hmac('sha1',this.salt)
                        .update(password)
                        .digest('hex')
        }catch(err)
        {
            return ''
        }
        
    }
}

module.exports= mongoose.model("User",userSchema)