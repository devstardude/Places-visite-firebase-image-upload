const mongoose = require("mongoose");
const uniqueValidator = require("mongoose-unique-validator");

const userSchema = new mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true,
        unique:true
    },
    password:{
        type:String,
        required:true,
        minlength:6
    },
    image:{
        type:String,
        required:true
    },
    places:[{
        type:mongoose.Types.ObjectId,
        ref:"Place",
        required:true
    }]
})

userSchema.plugin(uniqueValidator);

module.exports = mongoose.model("User",userSchema);