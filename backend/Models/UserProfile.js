    const mongoose = require('mongoose');

    const ProfileSchema = mongoose.Schema({
        userId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'UserData',
            required: true,
          },
        contactNumber:{
            type:String,
            required:true,
            unique:true
        },
        address:{
            type:String,
            required:true
        },
        profileImage:{
                data:Buffer,
                contentType: String
        }
    });

    const Profile = new mongoose.model('UserProfile', ProfileSchema);

    module.exports = Profile;
