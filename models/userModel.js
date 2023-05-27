const mongoose = require("mongoose");

const userSchema = mongoose.Schema(
    {
        username : 
        {
            type : String,
            required : [true, "Please enter userName"]
        },
        email :
        {
            type : String,
            required : [true, "Please enter email address"],
            unique: [true, "Email address is already taken"]
        },
        password: 
        {
            type : String,
            required : [true, "Please enter password"]
        }
    },
    {
        timestamps  : true,
    }
);


module.exports = mongoose.model("User", userSchema);