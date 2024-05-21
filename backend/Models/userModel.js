var mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
        fullname : {
            type:String,
            required:true,
        },
        email : {
            type:String,
            required:true,
        },
        password : {
            type:String,
            required:true,
        },
        profileId: {
            type: mongoose.Schema.Types.ObjectId, 
            ref: 'UserProfile' 
        }
});

const Users = mongoose.model("UserData", userSchema);
module.exports = Users;