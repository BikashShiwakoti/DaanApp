const mongoose = require('mongoose');
const itemData = mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'UserData',
        required: true,
      },
    itemImage: {
        data: Buffer,
        contentType: String,
    },
    description:{
        type: String,
        required:true
    }
})

const userItemData = mongoose.model('UserItemData', itemData);

module.exports = userItemData;